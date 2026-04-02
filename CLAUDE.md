# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

There are no tests configured in this project.

## Architecture

React app built with Vite. No routing, no state management library, no backend.

**Components:**
- `App.jsx` — root component; owns the `transactions` array state and passes data/callbacks down
- `Summary.jsx` — receives `transactions`, computes and displays total income, expenses, and balance
- `TransactionForm.jsx` — owns its own form state; calls `onAdd(transaction)` prop when submitted
- `TransactionList.jsx` — receives `transactions`, owns filter state (type + category), renders the filtered table

**State ownership:** `transactions` lives in `App`. Form state lives in `TransactionForm`. Filter state lives in `TransactionList`. Computed values (totals) are derived inside `Summary`.

**Data flow:** `App` → passes `transactions` to `Summary` and `TransactionList`; passes `handleAdd` as `onAdd` to `TransactionForm`, which appends a new transaction to the array.

**Styling:** `App.css` handles all component styles (layout, cards, table, form). `index.css` is a global reset only.

## Known Intentional Issues

This is a starter project for a Claude Code course — it was deliberately created with bugs and rough code to be fixed during the course:

- No delete functionality, though `.delete-btn` CSS styles exist in `App.css`
