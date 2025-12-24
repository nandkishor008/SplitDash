export const calculateSplits = ({
  splitType,
  totalAmount,
  participantIds,
  exactAmounts,
  percentages
}) => {
  const n = participantIds.length;
  const result = [];

  if (splitType === "EQUAL") {
    const share = parseFloat((totalAmount / n).toFixed(2));
    let sum = 0;
    for (let i = 0; i < n; i++) {
      const amt = i === n - 1 ? parseFloat((totalAmount - sum).toFixed(2)) : share;
      sum += share;
      result.push({ user: participantIds[i], amount: amt });
    }
  } else if (splitType === "EXACT") {
    const total = exactAmounts.reduce((a, b) => a + b, 0);
    if (Math.abs(total - totalAmount) > 0.01) {
      throw new Error("Exact amounts must sum to total amount");
    }
    for (let i = 0; i < n; i++) {
      result.push({ user: participantIds[i], amount: exactAmounts[i] });
    }
  } else if (splitType === "PERCENT") {
    const totalPercent = percentages.reduce((a, b) => a + b, 0);
    if (Math.abs(totalPercent - 100) > 0.01) {
      throw new Error("Percentages must sum to 100");
    }
    let sum = 0;
    for (let i = 0; i < n; i++) {
      const share = parseFloat(((percentages[i] / 100) * totalAmount).toFixed(2));
      const amt = i === n - 1 ? parseFloat((totalAmount - sum).toFixed(2)) : share;
      sum += share;
      result.push({ user: participantIds[i], amount: amt });
    }
  } else {
    throw new Error("Invalid split type");
  }

  return result;
};
