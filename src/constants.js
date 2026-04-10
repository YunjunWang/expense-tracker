export const CATEGORIES = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

export const formatCurrency = (n) =>
  Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
