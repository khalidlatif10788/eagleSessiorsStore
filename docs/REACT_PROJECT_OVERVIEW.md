# REACT_PROJECT_OVERVIEW.md

**Project:** Eagle Scissors Store — React frontend (`eagleSessiorsStore/`)  
**Purpose:** Map how this app is built so you can learn React by reading real code.

---

## 1. Full project structure (high level)

```
eagleSessiorsStore/
├── index.html              # HTML shell; Vite injects the JS bundle here
├── vite.config.js          # Vite bundler config, env exposure
├── package.json              # Dependencies & scripts
├── tailwind.config.js        # Tailwind CSS theme / content paths
├── postcss.config.js
├── public/                   # Static assets (favicon, etc.)
└── src/
    ├── main.jsx              # Entry: mounts React, Router, Redux Provider
    ├── App.jsx               # Routes, auth bootstrap, layouts
    ├── index.css             # Global CSS + Tailwind directives
    ├── App.css
    ├── assets/               # Images / SVG used in UI
    ├── services/
    │   └── api.js            # Axios instance: base URL, JWT, token refresh
    ├── common/
    │   └── CheckAuth.jsx     # “Protected route” rules (redirects)
    ├── layouts/
    │   ├── UseLayout.jsx     # Shop shell: Header + Outlet + Footer
    │   └── AdminLayout.jsx   # Admin shell: sidebar + Outlet
    ├── pages/                # Full-page screens (route targets)
    │   ├── Home.jsx
    │   ├── Login.jsx
    │   ├── Cart.jsx
    │   ├── SingleProduct.jsx
    │   ├── adminPages/       # Admin-only pages
    │   └── ...
    ├── components/           # Reusable UI pieces
    │   ├── layout/           # Header, Footer
    │   ├── sections/         # Hero, Banner, Category strips
    │   ├── productList/
    │   ├── reviews/
    │   ├── cards/
    │   └── adminComponents/
    └── redux/                # Global state + async API logic
        ├── store.js          # Single Redux store config
        ├── authSlice/
        ├── productSlice/
        ├── cartSlice/
        ├── orderSice/        # (typo: “Sice”)
        └── reviewSlice.jsx/
```

---

## 2. How the React app starts

1. **`index.html`** loads the Vite dev script → runs **`src/main.jsx`**.
2. **`main.jsx`**:
   - `createRoot(document.getElementById('root'))` — React 18 root API.
   - Wraps the tree in **`<StrictMode>`** (dev-only extra checks).
   - **`<BrowserRouter>`** — enables URL-based navigation.
   - **`<Provider store={store}>`** — makes Redux store available everywhere.
   - Renders **`<App />`**.

3. **`App.jsx`** runs next: checks auth on mount, defines all **`<Routes>`**, shows loader or routes.

**Files to open first:** `main.jsx` → `App.jsx` → `redux/store.js`.

---

## 3. How routing works

- **Library:** `react-router-dom` v7 (`BrowserRouter`, `Routes`, `Route`, `Navigate`, `Outlet`, `useParams`, `useNavigate`, `useLocation`).
- **Definition:** Almost all routes live in **`src/App.jsx`**.
- **Nested routes:**  
  - Parent route `path="/"` renders **`UseLayout`** (shop) with **`<Outlet />`** for child pages (`home`, `product/:id`, …).  
  - Parent route `path="/admin"` renders **`AdminLayout`** with **`<Outlet />`** for admin pages.
- **Dynamic segments:** e.g. `path="product/:id"` → read `id` in **`SingleProduct.jsx`** via **`useParams()`**.
- **“Protection”:** Not `ProtectedRoute` HOC; instead **`CheckAuth`** wraps layout routes and uses **`Navigate`** to redirect (see `src/common/CheckAuth.jsx`).

---

## 4. How pages connect

- Each **`<Route element={...} />`** points to a **page component** under `pages/` (or `pages/adminPages/`).
- **Layouts** wrap shared chrome: **`UseLayout`** = Header + main + Footer; **`AdminLayout`** = sidebar + main.
- **`<Outlet />`** in a layout is where child route components render.

---

## 5. How API calls work

- **HTTP client:** **Axios** (see `package.json`).
- **Central instance:** **`src/services/api.js`** — sets `baseURL`, attaches **`Authorization: Bearer`** from **`localStorage`**, handles refresh on 401.
- **Call sites:** Not usually raw `api.get` in pages; most calls are inside **Redux Toolkit** **`createAsyncThunk`** slices under **`src/redux/**`** (e.g. `authSlice`, `getAllProducts.jsx`).
- **Pattern:** Component `dispatch(someThunk())` → thunk calls `api` → result stored in Redux → component reads with **`useSelector`**.

---

## 6. How state flows through the app

| Layer | Role |
|--------|------|
| **Redux store** (`redux/store.js`) | One global store; each `reducer` key holds one “slice” of state. |
| **Slices** (`redux/.../*Slice.jsx`) | `createSlice` + often `createAsyncThunk` for API. |
| **Components** | `useDispatch` to send actions/thunks; `useSelector` to read state. |
| **Local UI state** | `useState` / `useEffect` inside components when only that screen cares (forms, toggles). |

There is **no React Context** for auth in this project; **auth state lives in Redux** (`state.auth`).

---

## 7. Folder roles (quick reference)

| Folder | Role |
|--------|------|
| `pages/` | Full pages tied to routes |
| `pages/adminPages/` | Admin-only pages |
| `components/` | Reusable UI (cards, header, sections) |
| `layouts/` | Route layouts with `Outlet` |
| `redux/` | State + API thunks |
| `services/` | Axios `api.js` |
| `common/` | Cross-cutting helpers (e.g. `CheckAuth`) |
| `index.css`, `App.css` | Global styles; Tailwind via `@tailwind` in `index.css` |

---

## 8. Technologies used (summary)

| Topic | This project |
|--------|----------------|
| React | **18.3.x** |
| Build | **Vite 6** (not Create React App) |
| Routing | **react-router-dom 7** |
| Global state | **Redux Toolkit** + **react-redux** |
| HTTP | **axios** (`src/services/api.js`) |
| Styling | **Tailwind CSS 3** + some **App.css** |
| Notifications | **react-hot-toast** (`<Toaster />` in `App.jsx`) |
| Spinners | **react-spinners** |
| Icons | **react-icons** |
| Google sign-in | **@react-oauth/google** |
| Payments (client) | **@stripe/stripe-js** (used on checkout) |
| Forms | Plain React + controlled inputs (no React Hook Form in `package.json`) |
| Tables / charts / MUI | **Not** used as libraries — tables are hand-built JSX |

---

## 9. Which files to study first (recommended order)

1. **`src/main.jsx`** — entry, providers.  
2. **`src/App.jsx`** — routes, auth check, layouts.  
3. **`src/common/CheckAuth.jsx`** — redirects / “guards”.  
4. **`src/layouts/UseLayout.jsx`** — `Outlet` pattern.  
5. **`src/redux/store.js`** + **`src/redux/authSlice/index.jsx`** — Redux + login.  
6. **`src/services/api.js`** — how the backend is called.  
7. **`src/pages/Login.jsx`** — form + dispatch.  
8. **`src/pages/Home.jsx`** — composing components.  
9. **`src/pages/SingleProduct.jsx`** — params, effects, Redux.  

---

## 10. Related docs in this folder

- **REACT_CONCEPTS_GUIDE.md** — concepts mapped to files.  
- **REACT_PROJECT_FLOW.md** — login → API → navigation.  
- **REACT_FILE_BY_FILE_GUIDE.md** — important files explained.  
- **REACT_LEARNING_PATH.md** — weekly roadmap.  
- **REACT_PRACTICE_TASKS.md** — exercises.  
- **REACT_BEGINNER_NOTES.md** — short definitions.  

---

*This overview reflects the repository as of the documentation date; file names may vary slightly (e.g. typos like `orderSice`).*
