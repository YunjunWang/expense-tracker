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

This is a single-component React app built with Vite. All application logic lives in `src/App.jsx` — there is no routing, no state management library, and no backend.

**State:** A single `useState` array of transaction objects, each with `{ id, description, amount, type, category }`. Amounts are stored as strings but used numerically in calculations — an intentional bug.

**Data flow:** Filters (type + category) are local state in `App.jsx` that derive a filtered view of the transactions array. The add-transaction form appends to the array via `setTransactions`.

**Styling:** `App.css` handles all component styles (layout, cards, table, form). `index.css` is a global reset only.

## Known Intentional Issues

This is a starter project for a Claude Code course — it was deliberately created with bugs and rough code to be fixed during the course:

- Transaction amounts are stored as strings, causing implicit coercion in numeric summation
- Transaction #4 ("Freelance Work") is incorrectly typed as `"expense"` instead of `"income"`
- No delete functionality, though `.delete-btn` CSS styles exist in `App.css`
