import React, { useState, useCallback } from "react";
import axiosClient from "../api/axiosClient";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import GroupCard from "../components/GroupCard";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import BalanceSummary from "../components/BalanceSummary";
import SettleModal from "../components/SettleModal";

const DashboardPage = ({ owner, onLogout }) => {
  const [currentGroup, setCurrentGroup] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState({
    simplified: [],
    perUser: [],
    pairwise: {}
  });
  const [friends, setFriends] = useState([]);

  const fetchGroupData = useCallback(async (group) => {
    if (!group?._id) return;
    const [eRes, bRes, gRes] = await Promise.all([
      axiosClient.get(`/expenses/group/${group._id}`),
      axiosClient.get(`/balances/group/${group._id}`),
      axiosClient.get(`/groups/${group._id}`)
    ]);
    setExpenses(eRes.data);
    setBalances(bRes.data); 
    setCurrentGroup(gRes.data);
  }, []);

  const handleGroupSelected = (group) => {
    fetchGroupData(group).catch(console.error);
  };

  const handleExpenseAdded = () => {
    if (currentGroup) fetchGroupData(currentGroup).catch(console.error);
  };

  const handleDeleteExpense = async (id) => {
    await axiosClient.delete(`/expenses/${id}`);
    if (currentGroup) fetchGroupData(currentGroup).catch(console.error);
  };

  return (
    <div className="app-shell">
      <Sidebar
        owner={owner}
        onGroupSelected={handleGroupSelected}
        onFriendsLoaded={setFriends}
      />
      <main className="main-area">
        <Navbar
          currentGroupName={currentGroup?.name}
          owner={owner}
          onLogout={onLogout}
        />
        {currentGroup ? (
          <>
            <GroupCard group={currentGroup} balances={balances} />
            <ExpenseForm
              group={currentGroup}
              users={friends}
              onExpenseAdded={handleExpenseAdded}
            />
            <BalanceSummary balances={balances} users={friends} />
            <SettleModal
              group={currentGroup}
              users={friends}
              pairwise={balances.pairwise}
              onAfterSettle={() => fetchGroupData(currentGroup)}
            />
            <ExpenseTable expenses={expenses} onDelete={handleDeleteExpense} />
          </>
        ) : (
          <div className="card">
            <div className="card-title">No group selected</div>
            <div className="card-sub">
              Add your friends on the left, then create a group for your trip.
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
