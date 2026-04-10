import { useState } from 'react'
import { CATEGORIES } from './constants'

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [descriptionError, setDescriptionError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);

    if (!description.trim()) {
      setDescriptionError("Description is required.");
      return;
    }

    if (!parsedAmount || parsedAmount <= 0) return;

    setDescriptionError("");
    onAdd({
      id: crypto.randomUUID(),
      description,
      amount: parsedAmount,
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <div className="add-transaction">
      <p className="section-title">Add Transaction</p>
      <form onSubmit={handleSubmit}>
        <div className="field-wrapper">
          <input
            type="text"
            placeholder="Description"
            maxLength={100}
            value={description}
            className={descriptionError ? "input-error" : ""}
            onChange={(e) => {
              setDescription(e.target.value);
              if (descriptionError) setDescriptionError("");
            }}
          />
          {descriptionError && <p className="field-error">{descriptionError}</p>}
        </div>
        <input
          type="number"
          placeholder="Amount"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TransactionForm
