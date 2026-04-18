# REACT_PROJECT_FLOW.md

How things flow **in this repository**, end to end.

---

## 1. App bootstrap → “Am I logged in?”

| Step | File | What happens |
|------|------|----------------|
| 1 | `main.jsx` | Renders `<App />` inside `BrowserRouter` + Redux `Provider`. |
| 2 | `App.jsx` | `useEffect` runs once → `dispatch(checkAuth())`. |
| 3 | `redux/authSlice/index.jsx` | `checkAuth` thunk calls `api.get("/check/auth")` with JWT header from `localStorage`. |
| 4 | Django (backend) | Returns `{ success, user }` if token valid. |
| 5 | Redux | `auth` slice updates `user`, `isAuthenticated`, `isLoading: false`. |
| 6 | `App.jsx` | Stops showing full-screen loader; renders `<Routes>`. |

**Beginner:** On every refresh, the app asks the server “who am I?” using the saved token.  
**Advanced:** This replaces cookie sessions with JWT + `Authorization` header (`services/api.js`).

---

## 2. User login

| Step | File | What happens |
|------|------|----------------|
| 1 | User opens `/login` | Route in `App.jsx` wraps `Login` in `GoogleOAuthProvider`. |
| 2 | `Login.jsx` | User submits email/password → `dispatch(loginUser({ email, password }))`. |
| 3 | `authSlice` | Thunk `api.post("/login", ...)` → receives `access`, `refresh`, `user`. |
| 4 | `authSlice` | Saves tokens to `localStorage` in `extraReducers` / fulfilled handler. |
| 5 | `CheckAuth.jsx` | Sees `isAuthenticated`; if user hits `/login` while logged in → redirect to `/home` or `/admin/home`. |

**Google:** `useGoogleLogin` with `flow: "auth-code"` → `dispatch(loginWithGoogle(code))` → `GET /login/google?code=...`.

---

## 3. “Dashboard” (shop home vs admin)

| Area | Route | Layout | Page |
|------|-------|--------|------|
| Shop | `/home` | `UseLayout` (Header + Outlet + Footer) | `pages/Home.jsx` |
| Admin | `/admin/home` | `AdminLayout` (sidebar + Outlet) | `pages/adminPages/AdminHome.jsx` |

**Navigation:** `Header.jsx` / `SideBar.jsx` use `<Link>` or `navigate()` from `react-router-dom`.

---

## 4. How forms submit (typical pattern)

1. **Local state** holds field values (`useState`).
2. **`onSubmit`** prevents default browser reload (`e.preventDefault()`).
3. **`dispatch(thunk(payload))`** runs async API call.
4. **Thunk** uses `api` from `services/api.js`.
5. **On success:** Redux updates OR `toast.success`; on error: `toast.error`.

**Examples:** `Login.jsx`, `Contact` form in `components/sections/Forme.jsx`, `AddAProduct.jsx` (multipart).

---

## 5. How API calls happen (data flow)

```
Component
  → dispatch(createAsyncThunk)
    → api.get/post/put/delete (services/api.js)
      → Backend JSON
        → thunk returns data
          → slice extraReducers → new state
            → useSelector in component → UI updates
```

**File:** Pick any `redux/**/*Slice.jsx` — pattern repeats.

---

## 6. Token / auth for API

| Piece | Location |
|--------|----------|
| Store tokens | `localStorage` (`access`, `refresh`) — see `authSlice` |
| Attach to requests | `api.js` request interceptor → `Authorization: Bearer ...` |
| Refresh on 401 | `api.js` response interceptor → `POST /api/token/refresh` |

---

## 7. Navigation (no full page reload)

- **Declarative:** `<Link to="/cart">` in `Header.jsx` etc.
- **Programmatic:** `useNavigate()` — e.g. after “Buy now” in `SingleProduct.jsx` → `navigate("/checkout")`.

---

## 8. How state updates (two layers)

| Layer | When |
|--------|------|
| **Redux** | User, products list, orders list, cart SKUs from server, etc. |
| **useState** | Form fields, open/closed UI, local quantity on a page |
| **localStorage** | Persist cart “order” array for checkout (`Cart.jsx`) |

---

## 9. CRUD (rough map)

| Action | Example area | Redux slice / page |
|--------|----------------|---------------------|
| **Create** | New product | `CreateProductSlic.jsx` + `AddAProduct.jsx` |
| **Read** | Product list | `getAllProducts.jsx` + `Products` / `ShopByCatagory` |
| **Read one** | Product detail | `getsingleProductSlice.jsx` + `SingleProduct.jsx` |
| **Update** | Edit product | `updateProductSlice.jsx` + `UpdateProduct.jsx` |
| **Delete** | Delete product | `deleteProductSlice.jsx` + admin views |

Orders/reviews follow similar thunk + page patterns.

---

## 10. Protected paths (who can see what)

**File:** `src/common/CheckAuth.jsx`

| Rule | Behavior |
|------|----------|
| Not logged in + URL contains `/admin` | Redirect to `/` |
| Not logged in + `/checkout` or `user/orders` | Redirect to `/login` |
| Logged in but not admin + `/admin` | Redirect to `/` |
| Logged in + `/login` or `/singup` | Redirect to `/home` or `/admin/home` |

**Beginner:** Think of `CheckAuth` as a gate around entire layout trees.  
**Advanced:** This is “authorization at layout level”; individual API calls should still validate on the server.

---

*Pair with **REACT_PROJECT_OVERVIEW.md** and **REACT_FILE_BY_FILE_GUIDE.md**.*
