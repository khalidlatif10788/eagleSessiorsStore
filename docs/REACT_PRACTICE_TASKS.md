# REACT_PRACTICE_TASKS.md

Practice tasks using **this** codebase. Do not change production behavior until you understand the flow; use a branch or duplicate files if unsure.

---

## Task 1 — Add a “Test” link in the footer

| Field | Value |
|-------|--------|
| **Difficulty** | Easy |
| **Concepts** | JSX, `Link`, layout |
| **Files** | `src/components/layout/Footer.jsx` |
| **Expected** | A link to an existing route (e.g. `/about`) or `/contact` with label “Test link”. |

---

## Task 2 — New presentational button component

| Field | Value |
|-------|--------|
| **Difficulty** | Easy |
| **Concepts** | Props, reusable component |
| **Files** | New `src/components/common/PrimaryButton.jsx`; use it once in `Home.jsx` |
| **Expected** | `<PrimaryButton onClick={...}>Shop</PrimaryButton>` renders with Tailwind styles. |

---

## Task 3 — Add a field to the contact form

| Field | Value |
|-------|--------|
| **Difficulty** | Easy–medium |
| **Concepts** | Controlled input, `useState`, form submit |
| **Files** | `src/components/sections/Forme.jsx`, Redux `sendMsgEmail.jsx` if API must change |
| **Expected** | Extra field (e.g. “Subject”) appears and is sent in the payload (backend must accept it if required). |

---

## Task 4 — New static page + route

| Field | Value |
|-------|--------|
| **Difficulty** | Medium |
| **Concepts** | React Router, nested route under `UseLayout` |
| **Files** | New `src/pages/FAQ.jsx`, add `<Route>` in `App.jsx` under the same parent as `home` |
| **Expected** | `/faq` shows your FAQ JSX inside Header/Footer. |

---

## Task 5 — Modal for order detail (admin)

| Field | Value |
|-------|--------|
| **Difficulty** | Medium |
| **Concepts** | Local state (`useState` open/close), conditional render, overlay |
| **Files** | `src/pages/adminPages/Orders.jsx` (already has detail UI — extract or tighten into a modal) |
| **Expected** | Clicking outside or “Close” hides the panel (if not already). |

---

## Task 6 — Filter orders table (client-side)

| Field | Value |
|-------|--------|
| **Difficulty** | Medium |
| **Concepts** | `useState` filter string, `.filter()` on array |
| **Files** | `Orders.jsx` |
| **Expected** | Text input filters rows by customer name or order id. |

---

## Task 7 — One new API call via Redux

| Field | Value |
|-------|--------|
| **Difficulty** | Medium–hard |
| **Concepts** | `createAsyncThunk`, slice, `useDispatch`/`useSelector` |
| **Files** | New slice or extend existing; `services/api.js`; small test page or `useEffect` in `Home.jsx` |
| **Expected** | Call a **real** backend endpoint you already have (e.g. `GET /get/logo`) and show result in UI. |

---

## Task 8 — Reusable product card props

| Field | Value |
|-------|--------|
| **Difficulty** | Easy |
| **Concepts** | Props drilling vs composition |
| **Files** | `UserCard.jsx`, `ProductList.jsx` |
| **Expected** | Document props in a comment or TypeScript types later; ensure title/price/image all come from props. |

---

## Task 9 — Loading spinner on a page

| Field | Value |
|-------|--------|
| **Difficulty** | Easy |
| **Concepts** | Redux loading flags, conditional UI |
| **Files** | Pick any page with `MoonLoader`; unify pattern |
| **Expected** | While `isLoading` from slice is true, show spinner; else content. |

---

## Task 10 — Stricter “protected” behavior

| Field | Value |
|-------|--------|
| **Difficulty** | Hard |
| **Concepts** | `Navigate`, `useLocation`, auth state |
| **Files** | `CheckAuth.jsx` |
| **Expected** | Document current rules; add one rule (e.g. redirect logged-out users from `/cart`) — **test all routes**. |

---

## Task 11 — Dashboard widget (admin home)

| Field | Value |
|-------|--------|
| **Difficulty** | Medium |
| **Concepts** | Fetch counts, display cards |
| **Files** | `AdminHome.jsx`, possibly testimonial endpoint that returns counts |
| **Expected** | Small card showing a number from API or Redux (even mock number first). |

---

## Task 12 — Custom hook `useProduct(id)`

| Field | Value |
|-------|--------|
| **Difficulty** | Hard |
| **Concepts** | Custom hooks, `useEffect`, `useDispatch` |
| **Files** | New `src/hooks/useProduct.js`; refactor `SingleProduct.jsx` gradually |
| **Expected** | Hook returns `{ product, skus, loading, error }` by dispatching existing thunks. |

---

*Start with tasks 1–4; move to 7+ when Redux clicks.*
