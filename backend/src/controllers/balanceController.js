import Expense from "../models/Expense.js";
import Group from "../models/Group.js";
import { simplifyBalances } from "../utils/simplifyBalances.js";

export const getGroupBalances = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId).populate("members", "name");
    if (!group) return res.status(404).json({ message: "Group not found" });

    const expenses = await Expense.find({ group: groupId });

    const memberIds = group.members
      .filter((m) => m)
      .map((m) => m._id.toString());
      
    const balancesMap = {};

    const addDebt = (from, to, amount) => {
      const key = `${from}_${to}`;
      balancesMap[key] = (balancesMap[key] || 0) + amount;
    };

    expenses.forEach((e) => {
      if (!e.paidBy) return;

      const payer = e.paidBy.toString();
      e.participants.forEach((p) => {
        if (!p.user) return;
        
        const userId = p.user.toString();
        if (userId === payer) return;
        addDebt(userId, payer, p.amount);
      });
    });
    const settlements = simplifyBalances(balancesMap);

    const balances = settlements.map((s) => {
      const fromMember = group.members.find((m) => m && m._id.toString() === s.from);
      const toMember = group.members.find((m) => m && m._id.toString() === s.to);

      return {
        from: s.from,
        to: s.to,
        amount: s.amount,
        fromName: fromMember ? fromMember.name : "Deleted User",
        toName: toMember ? toMember.name : "Deleted User"
      };
    });
    const perUser = {};
    memberIds.forEach((id) => {
      perUser[id] = { userId: id, owes: 0, owed: 0 };
    });

    balances.forEach((b) => {
      if (!perUser[b.from]) {
        perUser[b.from] = { userId: b.from, owes: 0, owed: 0 };
      }
      if (!perUser[b.to]) {
        perUser[b.to] = { userId: b.to, owes: 0, owed: 0 };
      }

      perUser[b.from].owes += b.amount;
      perUser[b.to].owed += b.amount;
    });

    const pairwise = {};
    balances.forEach((b) => {
      pairwise[`${b.from}_${b.to}`] = b.amount;
    });

    res.json({
      simplified: balances,
      perUser: Object.values(perUser),
      pairwise
    });
  } catch (err) {
    console.error("Balance calculation error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const recordPayment = async (req, res) => {
  try {
    const { groupId, fromFriendId, toFriendId, amount } = req.body;
    const amt = parseFloat(amount);

    if (!groupId || !fromFriendId || !toFriendId || !amt || amt <= 0) {
      return res.status(400).json({
        message: "groupId, fromFriendId, toFriendId, positive amount required"
      });
    }

    const group = await Group.findById(groupId).populate("members", "name");
    if (!group) return res.status(404).json({ message: "Group not found" });

    const fromMember = group.members.find((m) => m && m._id.toString() === fromFriendId);
    const toMember = group.members.find((m) => m && m._id.toString() === toFriendId);

    const fromName = fromMember ? fromMember.name : "Deleted User";
    const toName = toMember ? toMember.name : "Deleted User";

    await Expense.create({
      group: groupId,
      description: `Settlement payment ₹${amt} (${fromName} → ${toName})`,
      paidBy: fromFriendId,
      totalAmount: amt,
      splitType: "EXACT",
      participants: [{ user: toFriendId, amount: amt }]
    });

    res.status(201).json({
      message: `Recorded settlement of ₹${amt} from ${fromName} to ${toName}`
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};