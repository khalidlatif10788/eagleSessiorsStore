# REACT_LEARNING_PATH.md

A **4-week** roadmap tailored to **this** project (`eagleSessiorsStore`). Adjust pace to your schedule.

---

## Week 1 — JSX, components, props, state, events

| Goal | Activity in this repo |
|------|------------------------|
| Read JSX | Open `pages/Home.jsx`, `pages/About.jsx` — see HTML-like tags mixed with `{}`. |
| Components | Trace `App.jsx` → `UseLayout` → `Home` — parent/child. |
| Props | Read `common/CheckAuth.jsx` — `children`, `isAuthenticated`, `user`. |
| State | Open `pages/Login.jsx` — `useState` for email/password. |
| Events | Same file — `onSubmit`, `onChange`, `onClick`. |

**Mini-goal:** Explain out loud what renders when you visit `/home`.

---

## Week 2 — Hooks, forms, routing, API calls

| Goal | Activity |
|------|----------|
| `useEffect` | `App.jsx` (checkAuth), `SingleProduct.jsx` (fetch product/SKU). |
| Forms | `Login.jsx`, `Forme.jsx` (contact), `AddAProduct.jsx` (large form). |
| Routing | Memorize route table in `App.jsx`; try `useParams` in `SingleProduct.jsx`. |
| API + Redux | Read `redux/authSlice/index.jsx` + `services/api.js` — follow one thunk end to end. |

**Mini-goal:** Draw a diagram: button click → dispatch → thunk → api → Redux → UI.

---

## Week 3 — Auth, reusable UI, “global” state, CRUD

| Goal | Activity |
|------|----------|
| Auth flow | `authSlice`, `CheckAuth`, `Login`, token keys in `localStorage` (via `api.js`). |
| Reusable components | `components/cards/UserCard.jsx`, `ProductList.jsx`. |
| Redux slices | Pick `getAllProducts.jsx` + page that uses `getAllProducts` state. |
| CRUD | Admin: `AddAProduct` (create), `ProductsView` + delete slice, `UpdateProduct` (update). |

**Mini-goal:** List which Redux keys (`store.js`) you need for admin orders.

---

## Week 4 — Structure, optimization mindset, guards, deployment, debugging

| Goal | Activity |
|------|----------|
| Structure | Re-read `docs/REACT_PROJECT_OVERVIEW.md` — explain each folder. |
| Optimization | Notice: `useMemo`/`useCallback` are rare here; learn *when* you’d add them (not required day 1). |
| Protected routes | Re-read `CheckAuth.jsx` — list every redirect rule. |
| Deployment | Read Vite docs: `npm run build`, `preview`; env vars for production API URL. |
| Debugging | React DevTools (Components + Profiler); Redux DevTools extension for actions/state. |

**Mini-goal:** Use Redux DevTools to capture one `loginUser` action and inspect payload.

---

## Suggested daily rhythm (1–2 hours)

1. **Read** one doc section + one source file.  
2. **Trace** data from UI to Redux or API and back.  
3. **One small experiment** from `REACT_PRACTICE_TASKS.md` (optional).  

---

## After Week 4

- Refactor one slice for clarity (keep behavior identical).  
- Add tests (Vitest + React Testing Library) — not set up in this repo yet.  
- Extract a custom hook (e.g. `useCart`) from `Cart.jsx` — optional improvement.

---

*Companion: **REACT_PRACTICE_TASKS.md**, **REACT_BEGINNER_NOTES.md**.*
