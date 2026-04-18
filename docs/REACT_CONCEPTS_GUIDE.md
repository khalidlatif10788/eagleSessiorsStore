# REACT_CONCEPTS_GUIDE.md

Each concept: **simple idea** → **where this project uses it** → **snippet** → **why** → **beginner** vs **advanced**.

---

## Components

- **Simple:** Functions (or classes) that return UI (JSX).
- **In this project:** Every file under `pages/`, `components/`, `layouts/`, `App.jsx`.
- **Example:** `src/pages/Home.jsx` exports a function `Home` that returns JSX.

```jsx
function Home() {
  return <div>...</div>;
}
export default Home;
```

- **Why:** Split UI into reusable pieces.
- **Beginner:** One file = one screen or one widget.
- **Advanced:** Composition, lifting state, container vs presentational (this app mixes patterns informally).

---

## Props

- **Simple:** Data passed from parent to child: `<Header title="Shop" />`.
- **In this project:** e.g. `CheckAuth` receives `isAuthenticated`, `user`, `children` (`src/common/CheckAuth.jsx`).

```jsx
function CheckAuth({ isAuthenticated, user, children }) {
  // ...
  return <>{children}</>;
}
```

- **Why:** Make components configurable without changing their internal code.
- **Beginner:** Think “function arguments for JSX.”
- **Advanced:** `children` is a special prop for nested content (layout wrapper pattern).

---

## State (local)

- **Simple:** Data that can change and triggers re-render when updated.
- **In this project:** `useState` in pages/components, e.g. form fields in `Login.jsx`, toggles in `Header.jsx`.

---

## useState

- **Simple:** Hook that gives you `[value, setValue]` for one piece of state.
- **Example:** `src/pages/Login.jsx` — email/password fields.

```jsx
const [email, setEmail] = useState("");
```

- **Why:** Local UI state that doesn’t need the whole app to know about it.
- **Beginner:** Call `setEmail` when user types → screen updates.
- **Advanced:** Batching, functional updates `setX(prev => ...)`, avoiding stale closures in effects.

---

## useEffect

- **Simple:** Run side effects after render (fetch, subscriptions, DOM sync).
- **In this project:** `App.jsx` dispatches `checkAuth()` on mount; many pages scroll or fetch on mount.

```jsx
useEffect(() => {
  dispatch(checkAuth());
}, [dispatch]);
```

- **Why:** “When component mounts / when deps change, do something.”
- **Beginner:** `[]` = once on mount; `[skuId]` = when `skuId` changes.
- **Advanced:** Cleanup functions, exhaustive-deps lint rules, StrictMode double-invoke in dev.

---

## useMemo

- **Simple:** Cache a computed value until dependencies change.
- **In this project:** **Not used** in the scanned codebase (you may add it later for expensive lists).

---

## useCallback

- **Simple:** Cache a function identity for stable references (often for optimized children).
- **In this project:** **Not used** in the scanned codebase.

---

## useRef

- **Simple:** Mutable box that doesn’t trigger re-renders when changed; often used for DOM nodes.
- **In this project:** `src/components/cards/UserCard.jsx`, `AdminCard.jsx`, `HeroSEction.jsx`, `About.jsx` — `useRef` for animation / DOM measurement.

```jsx
const cardRef = useRef(null);
```

- **Why:** Access DOM without storing it in state.
- **Beginner:** “Hold a pointer to an element.”
- **Advanced:** Avoid reading `ref.current` during render; use in `useEffect` or event handlers.

---

## Context API

- **Simple:** `createContext` + `Provider` to pass data without prop drilling.
- **In this project:** **Not used for auth.** Redux provides global data instead.

---

## Redux (Redux Toolkit)

- **Simple:** One global store; components dispatch actions; reducers update state.
- **In this project:** `@reduxjs/toolkit` — `configureStore`, `createSlice`, `createAsyncThunk`.
- **Files:** `redux/store.js`, many `*Slice.jsx` under `redux/`.
- **Example:** `useDispatch` + `loginUser` in `Login.jsx`; state in `authSlice`.

```jsx
const dispatch = useDispatch();
dispatch(loginUser({ email, password }));
```

- **Why:** Shared state (user, cart-related flags, product lists) across many routes.
- **Beginner:** “One big JavaScript object for the whole app, updated by named actions.”
- **Advanced:** Normalized state, RTK Query (not used here), middleware.

---

## React Router

- **Simple:** URL ↔ screen mapping; nested routes; navigation without full page reload.
- **In this project:** `BrowserRouter` in `main.jsx`; `Routes`/`Route` in `App.jsx`; `Outlet` in layouts; `useParams`, `useNavigate`, `useLocation` in pages.

---

## Dynamic routes

- **Example:** `path="product/:id"` → `useParams()` in `SingleProduct.jsx` gives `{ id }`.

---

## Protected routes

- **Simple:** Redirect if not logged in or wrong role.
- **In this project:** Implemented in **`CheckAuth.jsx`** with `<Navigate to="..." />`, not a dedicated `<ProtectedRoute>` component.

---

## Forms & controlled inputs

- **Example:** `Login.jsx` — `value={email}` + `onChange` updates `useState`.
- **No** dedicated form library in `package.json`; validation is mostly manual / inline.

---

## Event handling

- **Example:** `onSubmit`, `onClick`, `onChange` throughout pages (e.g. `Login.jsx`, `Checkout.jsx`).

---

## Conditional rendering

- **Example:** `App.jsx` — `{isLoading ? <MoonLoader /> : <Routes>...</Routes>}`; `CheckAuth` returns different `<Navigate />` or `children`.

---

## Mapping lists

- **Example:** `ProductList.jsx` — `products?.map((product, index) => (...))`.

---

## API calls

- **Central:** `src/services/api.js` (Axios instance).
- **Typical flow:** Redux thunk → `api.post/get` → reducers update slice → UI via `useSelector`.

---

## Axios

- **In this project:** Used through `api.js` (interceptors for JWT). Individual slices `import api from "../../services/api"`.

---

## Authentication

- **Redux:** `auth` slice — `isAuthenticated`, `user`, `isLoading`.
- **Tokens:** `localStorage` keys `access` / `refresh` (see `authSlice/index.jsx`).
- **Bootstrap:** `checkAuth` thunk on app load (`App.jsx`).

---

## Local storage

- **Example:** `Cart.jsx` / `Checkout.jsx` — `localStorage.getItem("order")` for cart line items (SKU ids + quantities).

---

## JWT handling

- **File:** `src/services/api.js` — reads `access` from `localStorage`, sets `Authorization` header; refresh on 401.

---

## File upload

- **Example:** Admin add product (`AddAProduct.jsx`) builds `FormData` and posts via Redux thunk; review form uses `FormData` for images.

---

## Pagination / search / tables / modals

- **Pagination:** Not a dedicated library; product listing uses query params in API (`getAllProducts`).
- **Search:** Header search (see `Header.jsx`) filters client-side or via dispatch — read file for exact behavior.
- **Tables:** JSX `<table>` in admin `Orders.jsx` (no `react-table` in package.json).
- **Modals:** Often fixed overlay + state in component (e.g. admin orders detail), not a modal library.

---

## Toast notifications

- **Library:** `react-hot-toast` — `<Toaster />` in `App.jsx`; `toast.success` / `toast.error` in slices and pages.

---

## Environment variables

- **Vite:** `import.meta.env.VITE_*`; project also uses `process.env` via `vite.config.js` `define` for `BASE_URL`. See `src/services/api.js`.

---

## Reusable hooks

- **Custom hooks (`use*` in separate files):** **Not** a major pattern in this repo; logic lives in components and Redux thunks.

---

## Layout components

- **`UseLayout.jsx`**, **`AdminLayout.jsx`** — wrap routes and render `<Outlet />`.

---

## Loading & error handling

- **Loading:** `MoonLoader` from `react-spinners`; slice flags like `isLoading`, `isProductLoading`.
- **Errors:** `try/catch` in thunks; `toast.error`; some `console.log` only (could be improved).

---

## Styling

- **Tailwind CSS** — utility classes (`className="flex ..."`).
- **Global:** `index.css`, `App.css`.

---

## WhatsApp widget

- **Library:** `react-whatsapp-widget` — used in `App.jsx` (not core React, but shows third-party component integration).

---

*Use this guide alongside **REACT_FILE_BY_FILE_GUIDE.md** for file-specific walkthroughs.*
