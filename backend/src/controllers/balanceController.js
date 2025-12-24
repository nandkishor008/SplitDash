import Expense from "../models/Expense.js";
import Group from "../models/Group.js";
import { simplifyBalances } from "../utils/simplifyBalances.js";

export const getGroupBalances = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId).populate("members", "name");
    if (!group) return res.status(404).json({ message: "Group not found" });

    const expenses = await Expense.find({ group: groupId });

    const memberIds = group.members.map((m) => m._id.toString());
    const balancesMap = {};

    const addDebt = (from, to, amount) => {
      const key = `${from}_${to}`;
      balancesMap[key] = (balancesMap[key] || 0) + amount;
    };

    // Build who owes whom from expenses
    expenses.forEach((e) => {
      const payer = e.paidBy.toString();
      e.participants.forEach((p) => {
        const userId = p.user.toString();
        if (userId === payer) return;
        addDebt(userId, payer, p.amount);
      });
    });

    // Simplify debts
    const settlements = simplifyBalances(balancesMap);

    const balances = settlements.map((s) => ({
      from: s.from,
      to: s.to,
      amount: s.amount,
      fromName:
        group.members.find((m) => m._id.toString() === s.from)?.name || "",
      toName:
        group.members.find((m) => m._id.toString() === s.to)?.name || ""
    }));

    // Per-user owes / owed
    const perUser = {};
    memberIds.forEach((id) => {
      perUser[id] = { userId: id, owes: 0, owed: 0 };
    });

    balances.forEach((b) => {
      perUser[b.from].owes += b.amount;
      perUser[b.to].owed += b.amount;
    });

    // Pairwise map: fromId_toId -> amount
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
    res.status(500).json({ message: err.message });
  }
};

// Manual settlement: "from" paid "to" some amount
export const recordPayment = async (req, res) => {
  try {
    const { groupId, fromFriendId, toFriendId, amount } = req.body;
    const amt = parseFloat(amount);

    if (!groupId || !fromFriendId || !toFriendId || !amt || amt <= 0) {
      return res.status(400).json({
        message:
          "groupId, fromFriendId, toFriendId, positive amount required"
      });
    }

    const group = await Group.findById(groupId).populate("members", "name");
    if (!group) return res.status(404).json({ message: "Group not found" });

    const fromName =
      group.members.find((m) => m._id.toString() === fromFriendId)?.name ||
      "Friend";
    const toName =
      group.members.find((m) => m._id.toString() === toFriendId)?.name ||
      "Friend";

    // Treat settlement as expense paid by "from" and owed by "to"
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
