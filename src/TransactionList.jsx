import { useState } from 'react'
import { CATEGORIES, fmt } from './constants'

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length === 0 ? (
            <tr>
              <td colSpan={5} className="empty-state">No transactions match the selected filters.</td>
            </tr>
          ) : (
            filteredTransactions.map(t => (
              <tr key={t.id}>
                <td className="date-cell">{t.date}</td>
                <td>{t.description}</td>
                <td><span className={`cat-badge cat-${t.category}`}>{t.category}</span></td>
                <td className={`amount-cell ${t.type === "income" ? "income-amount" : "expense-amount"}`}>
                  {t.type === "income" ? "+" : "−"}${fmt(t.amount)}
                </td>
                <td>
                  <button className="delete-btn" onClick={() => {
                    if (window.confirm('Delete this transaction?'))
                      onDelete(t.id);
                  }}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList
