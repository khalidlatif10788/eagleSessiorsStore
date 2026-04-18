

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import toast from "react-hot-toast";

const initialState = {
  isLoading: false,
  message:null
};


export const deleteReviewAdmin = createAsyncThunk(
    "get/all/reviews/admin",
    async (id) => {
      try {
        const response = await api.delete(`/delete/a/review/admin/${id}`);
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message)
      }
    }
  );




  const deleteReviewAdminSlice = createSlice({
    name: "deleteReviewAdminSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(deleteReviewAdmin.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteReviewAdmin.fulfilled, (state, action) => {
          state.isLoading = false;
          state.message = action.payload?.success?action.payload?.message:null;
        })
        .addCase(deleteReviewAdmin.rejected, (state, action) => {
          state.isLoading = false;
          state.message = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default deleteReviewAdminSlice.reducer;
  