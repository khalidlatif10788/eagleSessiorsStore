# REACT_BEGINNER_NOTES.md

Very short explanations — **this project** is the example context.

---

## What is React?

A **JavaScript library** for building user interfaces out of **components**. When data changes, React updates the screen efficiently.  
**Here:** The shop UI is built from files in `src/pages` and `src/components`.

---

## What is JSX?

Syntax that **looks like HTML inside JavaScript**. Browsers don’t run JSX directly; **Vite** compiles it to `React.createElement` calls.  
**Example:** `return <div>Hello</div>` in any `.jsx` file.

---

## What is a component?

A **function** (usually) that **returns JSX**. You can use it like `<Home />`.  
**Here:** `Home`, `Header`, `UserCard` are components.

---

## What are props?

**Inputs** to a component, like function arguments: `<UserCard title="..." />`.  
**Here:** `CheckAuth` receives `children`, `isAuthenticated`, `user`.

---

## What is state?

Data that **belongs to the component** (or app) and **can change**. When state changes, React **re-renders** that part of the tree.  
**Two levels in this app:**  
- **Local:** `useState` in a page.  
- **Global:** **Redux** store (`redux/store.js`).

---

## What is a hook?

A **function** whose name starts with `use` — you call it **at the top level** of a component (not inside loops/conditions). Hooks give you state, effects, refs, etc.  
**Here:** `useState`, `useEffect`, `useDispatch`, `useSelector`, `useParams`, `useNavigate`, `useRef`.

---

## What is useState?

Returns `[value, setValue]`. Calling `setValue(new)` updates the UI.  
**Here:** Login email/password, cart quantity, many toggles.

---

## What is useEffect?

Runs **after render** for **side effects**: talking to API, timers, subscribing. Second argument is the **dependency array**.  
**Here:** `App.jsx` loads `checkAuth` on mount; `SingleProduct.jsx` loads data when `id` or `skuId` changes.

---

## What is React Router?

Maps **URLs** to **components** so SPA feels like multiple pages without full reloads.  
**Here:** `BrowserRouter` in `main.jsx`, routes in `App.jsx`, `Link` / `navigate` for movement.

---

## What is an API call?

Your app **sends HTTP** (GET/POST/…) to a server and **gets JSON** back.  
**Here:** Centralized in **`services/api.js`** using **Axios**; thunks in `redux/` call `api`.

---

## What is Axios?

A popular **HTTP client** (alternative to `fetch`).  
**Here:** Wrapped as `api` with interceptors for JWT.

---

## What is a controlled input?

An `<input>` whose **`value`** comes from React state and **`onChange`** updates that state. The input is “controlled” by React.  
**Here:** `Login.jsx` email field: `value={email}` + `onChange` → `setEmail`.

---

## What is localStorage?

**Browser key-value storage** that survives refresh (until cleared).  
**Here:** JWT `access` / `refresh` tokens; cart `order` JSON for checkout.

---

## What is token auth?

Server issues a **token** (JWT) after login; client sends `Authorization: Bearer <token>` on later requests.  
**Here:** `api.js` reads token from `localStorage` and attaches the header.

---

## What is a reusable component?

A component written to be used **many times** with different props — e.g. one `UserCard` for every product.  
**Here:** `UserCard`, `ProductList`, layout pieces.

---

## What is Redux (in one line)?

A **single store** holding app-wide state; you **dispatch actions** and **reducers** compute the next state.  
**Here:** `auth`, products, orders, etc. in `redux/store.js`.

---

*For deeper mapping, read **REACT_CONCEPTS_GUIDE.md** and **REACT_PROJECT_FLOW.md**.*
