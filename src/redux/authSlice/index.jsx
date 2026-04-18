import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import api from "../../services/api";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

function persistTokens(payload) {
  if (payload?.access) {
    localStorage.setItem("access", payload.access);
    if (payload.refresh) {
      localStorage.setItem("refresh", payload.refresh);
    }
  }
}

function clearTokens() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

export const registerUser = createAsyncThunk(
  "singup/user",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/register", formData);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "login/user",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", formData);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "login/with/google/user",
  async (code) => {
    try {
      const response = await api.get(`/login/google?code=${code}`);
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
      throw error;
    }
  }
);

export const logoutUser = createAsyncThunk("logout/user", async () => {
  try {
    const response = await api.get("/logout");
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
});

export const checkAuth = createAsyncThunk("check/auth", async () => {
  const response = await api.get("/check/auth", {
    headers: {
      "Cache-Control":
        "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        persistTokens(action.payload);
        state.isLoading = false;
        state.user = action.payload?.success ? action.payload?.user : null;
        state.isAuthenticated = action.payload?.success ? true : false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        persistTokens(action.payload);
        state.isLoading = false;
        state.user = action.payload?.success ? action.payload?.user : null;
        state.isAuthenticated = action.payload?.success ? true : false;
      })
      .addCase(loginWithGoogle.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.success ? action.payload?.user : null;
        state.isAuthenticated = action.payload?.success ? true : false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        clearTokens();
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        clearTokens();
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
