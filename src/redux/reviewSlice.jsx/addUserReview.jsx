import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import toast from "react-hot-toast";

const initialState = {
  isLoading: false,
  message:null
};


export const addUserReview = createAsyncThunk(
    "add/user/review",
    async (data) => {
      try {
        const response = await api.post("/user/add/review",data);
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message)
      }
    }
  );




  const addUserReviewSlice = createSlice({
    name: "addUserReviewSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(addUserReview.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(addUserReview.fulfilled, (state, action) => {
          state.isLoading = false;
          state.message = action.payload?.success?action.payload?.message:null;
        })
        .addCase(addUserReview.rejected, (state, action) => {
          state.isLoading = false;
          state.message = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default addUserReviewSlice.reducer;
  