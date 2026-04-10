import { fmt } from './constants'

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <div className="summary-card">
        <div className="card-indicator income-indicator">↑</div>
        <h3>Income</h3>
        <p className="income-amount">${fmt(totalIncome)}</p>
      </div>
      <div className="summary-card">
        <div className="card-indicator expense-indicator">↓</div>
        <h3>Expenses</h3>
        <p className="expense-amount">${fmt(totalExpenses)}</p>
      </div>
      <div className="summary-card balance-card">
        <div className="card-indicator balance-indicator">◈</div>
        <h3>Balance</h3>
        <p
          className="balance-amount"
          style={{ color: balance >= 0 ? 'var(--income)' : 'var(--expense)' }}
        >
          {balance >= 0 ? '' : '−'}${fmt(Math.abs(balance))}
        </p>
      </div>
    </div>
  );
}

export default Summary
