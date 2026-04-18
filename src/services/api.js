/**
 * Central Axios instance for the Django REST API.
 * - Sets `baseURL` from Vite env (see `.env`).
 * - Sends `Authorization: Bearer <access>` when tokens exist in localStorage.
 * - Refreshes access token on 401 using `POST /api/token/refresh` (SimpleJWT).
 */
import axios from "axios";

/**
 * Resolve Django API origin.
 * - Prefer `VITE_API_URL` in `.env` (Vite exposes `import.meta.env.VITE_*`).
 * - Legacy: `BASE_URL` via vite.config `define` + dotenv.
 * - Dev fallback: same machine Django default so the app works without a `.env` file.
 */
const baseURL = (
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_BASE_URL ||
  (typeof process !== "undefined" && process.env?.BASE_URL) ||
  (import.meta.env.DEV ? "http://127.0.0.1:8000" : "")
)
  .toString()
  .replace(/\/$/, "");

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const access = localStorage.getItem("access");
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  // Let the browser set multipart boundaries for `FormData`.
  if (typeof FormData !== "undefined" && config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && original && !original._retry) {
      original._retry = true;
      const refresh = localStorage.getItem("refresh");
      if (refresh) {
        try {
          const { data } = await axios.post(`${baseURL}/api/token/refresh`, {
            refresh,
          });
          localStorage.setItem("access", data.access);
          if (data.refresh) {
            localStorage.setItem("refresh", data.refresh);
          }
          original.headers.Authorization = `Bearer ${data.access}`;
          return api(original);
        } catch {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
