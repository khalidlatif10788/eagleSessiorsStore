# REACT_FILE_BY_FILE_GUIDE.md

Important files in **learning order**. Paths are under `eagleSessiorsStore/src/` unless noted.

---

## `main.jsx`

| Question | Answer |
|----------|--------|
| **What it does** | Mounts the React app into the DOM node `#root`. |
| **Why it exists** | Every bundler needs one entry that calls `createRoot().render(...)`. |
| **Connects to** | `App.jsx`, `redux/store.js`, `BrowserRouter`, `Provider`. |
| **Concepts** | React 18 root API, providers wrapping the tree. |
| **Learn** | Order of providers matters: Router outside or inside Redux is a design choice — here Router wraps Redux’s `Provider`… actually **main.jsx** has `BrowserRouter` → `Provider` → `App`. |

---

## `App.jsx`

| Question | Answer |
|----------|--------|
| **What it does** | Defines all routes; runs `checkAuth` on mount; wraps shop vs admin layouts; renders `Toaster`, WhatsApp widget. |
| **Why** | Central route table; single place to see the whole app map. |
| **Connects to** | Every page, `CheckAuth`, layouts, Redux `auth` slice. |
| **Concepts** | `Routes`/`Route`, nested routes, `useEffect`, `useDispatch`, `useSelector`, conditional rendering (loader vs routes). |
| **Learn** | This is the **routing hub** — find any URL here first. |

---

## `common/CheckAuth.jsx`

| Question | Answer |
|----------|--------|
| **What it does** | Wraps layout `children`; redirects with `<Navigate />` based on path + auth + `user.role`. |
| **Why** | Reuse one “guard” instead of copying logic on every page. |
| **Connects to** | `App.jsx` passes `isAuthenticated` and `user` from Redux. |
| **Concepts** | Props, `useLocation`, conditional returns, fragments `<>`. |
| **Learn** | **Protected-route behavior** for this project lives here — not in a separate `ProtectedRoute.jsx`. |

---

## `layouts/UseLayout.jsx`

| Question | Answer |
|----------|--------|
| **What it does** | Renders `Header`, `<Outlet />`, `Footer`. |
| **Why** | Shared chrome for all shop routes under parent `Route`. |
| **Concepts** | Nested routing, `Outlet`. |
| **Learn** | Child routes (e.g. `home`, `product/:id`) render **inside** `<Outlet />`. |

---

## `layouts/AdminLayout.jsx`

| Question | Answer |
|----------|--------|
| **What it does** | Admin shell — typically sidebar + `<Outlet />` for `/admin/*` children. |
| **Learn** | Same `Outlet` idea as `UseLayout`, different chrome. |

---

## `redux/store.js`

| Question | Answer |
|----------|--------|
| **What it does** | `configureStore({ reducer: { ... } })` — registers every slice reducer. |
| **Why** | Single source of truth for global state. |
| **Learn** | Keys like `auth`, `getAllProducts` are how you read state: `state.auth`, `state.getAllProducts`. |

---

## `redux/authSlice/index.jsx`

| Question | Answer |
|----------|--------|
| **What it does** | Register, login, logout, Google login, `checkAuth`; stores tokens in `localStorage`. |
| **Why** | All authentication concerns in one slice. |
| **Connects to** | `api.js`, `Login.jsx`, `Register.jsx`, `App.jsx`. |
| **Concepts** | `createSlice`, `createAsyncThunk`, `extraReducers`, async flow. |
| **Learn** | **Login logic** and **token persistence** — study this for auth. |

---

## `services/api.js`

| Question | Answer |
|----------|--------|
| **What it does** | Axios instance with `baseURL`, JWT header, refresh on 401. |
| **Why** | One place for API configuration (DRY). |
| **Learn** | **All HTTP** to your backend should go through here (thunks import `api`). |

---

## `pages/Login.jsx`

| Question | Answer |
|----------|--------|
| **What it does** | Email/password form; Google button; dispatches login thunks. |
| **Concepts** | `useState`, controlled inputs, `useDispatch`, `useSelector`, form submit. |
| **Learn** | Classic **form → Redux thunk** pattern. |

---

## `pages/Home.jsx`

| Question | Answer |
|----------|--------|
| **What it does** | Composes sections (hero, categories, etc.). |
| **Learn** | How **pages assemble smaller components** from `components/`. |

---

## `pages/SingleProduct.jsx`

| Question | Answer |
|----------|--------|
| **What it does** | Product detail: `useParams` for `:id`, loads product + SKU, cart actions, reviews. |
| **Concepts** | `useEffect`, `useParams`, Redux thunks, local state, conditional UI. |
| **Learn** | **Dynamic route + data loading** — core e-commerce page. |

---

## `pages/Cart.jsx` & `Checkout.jsx`

| Question | Answer |
|----------|--------|
| **What they do** | Cart uses `localStorage` + Redux to resolve line items; checkout collects shipping and payment flow. |
| **Learn** | Mixing **client persistence** (`localStorage`) with **server APIs**. |

---

## `components/layout/Header.jsx`

| Question | Answer |
|----------|--------|
| **What it does** | Nav links, search, cart badge, logo fetch, auth-dependent UI. |
| **Learn** | **Global navigation** and dispatching product/logo fetches. |

---

## `components/cards/UserCard.jsx` / `AdminCard.jsx`

| Question | Answer |
|----------|--------|
| **What they do** | Product cards with hover/animation; `useRef` for effects. |
| **Learn** | **Reusable presentational** components + `useRef` for DOM. |

---

## `pages/adminPages/Orders.jsx`

| Question | Answer |
|----------|--------|
| **What it does** | Table of orders, status changes, modal-style detail panel. |
| **Learn** | **Table rendering** and admin CRUD-style interactions (no table library). |

---

## `pages/adminPages/AddAProduct.jsx`

| Question | Answer |
|----------|--------|
| **What it does** | Large multi-step form; `FormData` for images; dispatches create product thunk. |
| **Learn** | **File upload** and complex form state in one file. |

---

## Files you can skip at first

- Static policy pages (`PrivacyP.jsx`, etc.) — mostly JSX content.
- `ForgetPassword.jsx` / `ResetPasssword.jsx` — placeholders unless wired to API.

---

## Typos to know

- Folder `redux/orderSice` is named **Sice** (not `Slice`) — imports still work; be careful when searching.

---

*Cross-reference: **REACT_PROJECT_OVERVIEW.md**, **REACT_PROJECT_FLOW.md**.*
