# REACT_TEACHING_WALKTHROUGH.md (Phase 3)

**Where is X in this project?** — quick map, then one **line-by-line** example.

---

## Quick map: “Which file contains…?”

| Topic | File(s) |
|--------|---------|
| **Routing** | `src/App.jsx` (`Routes`, `Route`) |
| **API client (Axios)** | `src/services/api.js` |
| **Login / auth thunks** | `src/redux/authSlice/index.jsx` |
| **Forms (examples)** | `src/pages/Login.jsx`, `src/components/sections/Forme.jsx`, `src/pages/adminPages/AddAProduct.jsx` |
| **Reusable components** | `src/components/layout/Header.jsx`, `Footer.jsx`, `components/cards/UserCard.jsx`, `components/productList/ProductList.jsx`, … |
| **Protected / gated routes** | `src/common/CheckAuth.jsx` (wraps layouts in `App.jsx`) |
| **Table rendering** | `src/pages/adminPages/Orders.jsx` (HTML `<table>`) |
| **Modal / overlay panels** | `src/pages/adminPages/Orders.jsx` (fixed overlay + `selectedOrder` state) — pattern, not a library |
| **Dashboard-style cards** | `src/pages/adminPages/AdminHome.jsx`, `src/components/cards/AdminCard.jsx` |
| **Toast / notifications** | `react-hot-toast` — `<Toaster />` in `App.jsx`; `toast.*` in many files |
| **Dynamic route params** | `src/pages/SingleProduct.jsx` — `useParams()` for `product/:id` |

---

## Example A — `CheckAuth.jsx` (beginner → advanced)

**File:** `src/common/CheckAuth.jsx`

### Full code (reference)

```jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  let location = useLocation();

  if (!isAuthenticated && location.pathname.includes("/admin")) {
    return <Navigate to={"/"} />;
  }
  if (location.pathname === "/") {
    return <Navigate to={"/home"} />;
  }
  if (!isAuthenticated && location.pathname.includes("/checkout")) {
    return <Navigate to={"/login"} />;
  }
  if (!isAuthenticated && location.pathname.includes("user/orders")) {
    return <Navigate to={"/login"} />;
  }
  if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("/admin")) {
    return <Navigate to={"/"} />;
  }
  if (isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/singup"))) {
    if (user?.role === "admin") {
      return <Navigate to={"/admin/home"} />;
    } else {
      return <Navigate to={"/home"} />;
    }
  }

  return <>{children}</>;
}

export default CheckAuth;
```

### Line by line (simple)

1. **Import `Navigate`, `useLocation`** — tools from React Router.
2. **`function CheckAuth({ isAuthenticated, user, children })`** — React passes **props** from parent (`App.jsx`).
3. **`useLocation()`** — gives current URL path; stored in `location`.
4. **Each `if`** — a rule: if condition true, **redirect** with `<Navigate to="..." />` instead of showing children.
5. **Last `return <>{children}</>`** — if no rule fired, render whatever was nested inside `<CheckAuth>` (layouts + routes).

### Why written this way

- **Early returns** keep each rule separate (easy to read; order matters — first match wins).
- **`children`** is the nested layout (`UseLayout` or `AdminLayout`) so you don’t duplicate layout code.

### Advanced notes

- **Not** using `<Outlet />` here — `CheckAuth` wraps the **layout element**, not each leaf route.
- **Optional chaining** `user?.role` avoids crash if `user` is null.
- **Security:** This only protects **UI**; server must still authorize APIs.

---

## Example B — `App.jsx` bootstraps auth (short)

```jsx
useEffect(() => {
  dispatch(checkAuth());
}, [dispatch]);
```

- **Beginner:** When the app loads, ask the server “am I still logged in?”
- **Advanced:** `dispatch` is stable in RTK but included in deps for lint compliance; `checkAuth` runs once on mount.

---

## Example C — Redux thunk (pattern)

In `authSlice`, `loginUser` uses `createAsyncThunk` → calls `api.post("/login", ...)` → on success, Redux stores user + tokens.

- **Beginner:** One function that “does login and saves result.”
- **Advanced:** Async middleware, fulfilled/pending/rejected handlers in `extraReducers`.

---

## What to read next

1. `Login.jsx` — connect form to `loginUser`.  
2. `redux/store.js` — see reducer names.  
3. `services/api.js` — see JWT interceptors.  

---

*End of Phase 3 walkthrough. See **REACT_FILE_BY_FILE_GUIDE.md** for more files.*
