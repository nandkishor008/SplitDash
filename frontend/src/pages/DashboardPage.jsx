import React, { useState, useCallback, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { FaBars } from "react-icons/fa"; 

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import GroupCard from "../components/GroupCard";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import BalanceSummary from "../components/BalanceSummary";
import SettleModal from "../components/SettleModal";

const DashboardPage = ({ owner, onLogout, sharedGroup, isShared }) => {
  const [currentGroup, setCurrentGroup] = useState(sharedGroup || null);
  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState({ simplified: [], perUser: [], pairwise: {} });
  const [friends, setFriends] = useState([]);
  
  // 📱 Mobile State
  const [mobileOpen, setMobileOpen] = useState(false);

  // 🛠️ PERMISSION LOGIC
  // 'canEdit' controls the ADD form only.
  const canEdit = !isShared || (currentGroup?.sharePermission === 'editor');

  // 🛠️ USER LIST LOGIC
  const activeUsers = isShared && currentGroup ? currentGroup.members : friends;

  const fetchGroupData = useCallback(async (group) => {
    if (!group?._id) return;
    try {
      const [eRes, bRes, gRes] = await Promise.all([
        axiosClient.get(`/expenses/group/${group._id}`),
        axiosClient.get(`/balances/group/${group._id}`),
        axiosClient.get(`/groups/${group._id}`),
      ]);
      setExpenses(eRes.data);
      setBalances(bRes.data);
      setCurrentGroup(gRes.data);
    } catch (error) { console.error(error); }
  }, []);

  useEffect(() => {
    if (sharedGroup?._id) fetchGroupData(sharedGroup);
  }, [sharedGroup, fetchGroupData]);

  const handleGroupSelected = (group) => {
    if (isShared) return;
    fetchGroupData(group).catch(console.error);
    setMobileOpen(false); 
  };

  const handleExpenseAdded = () => { if (currentGroup) fetchGroupData(currentGroup); };
  const handleDeleteExpense = async (id) => {
    await axiosClient.delete(`/expenses/${id}`);
    if (currentGroup) fetchGroupData(currentGroup);
  };

  return (
    <div className="app-shell">
      
      {!isShared && (
        <div className="mobile-header">
           <button className="menu-btn" onClick={() => setMobileOpen(true)}>
             <FaBars />
           </button>
           <div className="mobile-logo">SplitDash</div>
           <div style={{ width: 24 }}></div>
        </div>
      )}

      {!isShared && (
        <Sidebar
          owner={owner}
          onGroupSelected={handleGroupSelected}
          onFriendsLoaded={setFriends}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
      )}

      <main className="main-area">
        <Navbar currentGroupName={currentGroup?.name} owner={owner} onLogout={onLogout} isShared={isShared} />

        {currentGroup ? (
          <>
            <GroupCard 
              group={currentGroup} 
              balances={balances} 
              isShared={isShared} 
              onGroupUpdated={(g) => setCurrentGroup(g)} 
              expenses={expenses} 
            />
            
            {/* 1. Add Expense Form (Visible if Owner OR Editor) */}
            {canEdit && (
                <ExpenseForm 
                  group={currentGroup} 
                  users={activeUsers} 
                  onExpenseAdded={handleExpenseAdded} 
                />
            )}

            {/* 2. Balances Section */}
            <BalanceSummary balances={balances} users={activeUsers} />

            {/* 3. Settle Dues (Owner Only) */}
            {!isShared && (
                <SettleModal 
                  group={currentGroup} 
                  users={friends} 
                  pairwise={balances.pairwise} 
                  onAfterSettle={() => fetchGroupData(currentGroup)} 
                />
            )}

            {/* 4. Expense Table */}
            {/* 👇 FIX: We use '!isShared' so ONLY the Owner sees the Delete button. */}
            <ExpenseTable 
              expenses={expenses} 
              onDelete={!isShared ? handleDeleteExpense : null} 
              isShared={isShared} 
            />
          </>
        ) : (
          <div className="card">
            <div className="card-title">No group selected</div>
            <div className="card-sub">Open the menu to create a group or add friends.</div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;