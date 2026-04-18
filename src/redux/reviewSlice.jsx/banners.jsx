import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import toast from "react-hot-toast";

const initialState = {
  isLoading: false,
  message:null
};


export const addBannerAdmin = createAsyncThunk(
    "add/admin/banner",
    async (data) => {
      try {
        const response = await api.post("/add/a/banner",data);
        return response.data;
      } catch (error) {
        console.log(error);
        return toast.error(error.response.data.message)
      }
    }
  );
export const deleteBannerAdmin = createAsyncThunk(
    "delete/admin/banner",
    async (id) => {
      try {
        const response = await api.delete(`/delete/a/banner/${id}`);
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message)
      }
    }
  );




  const bannerSlice = createSlice({
    name: "bannerSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(addBannerAdmin.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(addBannerAdmin.fulfilled, (state, action) => {
          state.isLoading = false;
          state.message = action.payload?.success?action.payload?.message:null;
        })
        .addCase(addBannerAdmin.rejected, (state, action) => {
          state.isLoading = false;
          state.message = null;
        })
        .addCase(deleteBannerAdmin.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteBannerAdmin.fulfilled, (state, action) => {
          state.isLoading = false;
          state.message = action.payload?.success?action.payload?.message:null;
        })
        .addCase(deleteBannerAdmin.rejected, (state, action) => {
          state.isLoading = false;
          state.message = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default bannerSlice.reducer;
  