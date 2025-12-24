
export const simplifyBalances = (balances) => {
  const net = {};

  Object.entries(balances).forEach(([pair, amount]) => {
    const [from, to] = pair.split("_");
    if (!net[from]) net[from] = 0;
    if (!net[to]) net[to] = 0;
    net[from] -= amount;
    net[to] += amount;
  });

  const debtors = [];
  const creditors = [];
  Object.entries(net).forEach(([userId, val]) => {
    if (val < 0) debtors.push({ userId, amount: -val });
    else if (val > 0) creditors.push({ userId, amount: val });
  });

  const settlements = [];
  let i = 0,
    j = 0;
  while (i < debtors.length && j < creditors.length) {
    const d = debtors[i];
    const c = creditors[j];
    const settled = Math.min(d.amount, c.amount);

    settlements.push({
      from: d.userId,
      to: c.userId,
      amount: parseFloat(settled.toFixed(2))
    });

    d.amount -= settled;
    c.amount -= settled;

    if (d.amount === 0) i++;
    if (c.amount === 0) j++;
  }

  return settlements;
};
