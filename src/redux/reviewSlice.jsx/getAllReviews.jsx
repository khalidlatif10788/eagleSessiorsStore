import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  isLoading: false,
  reviews:null
};


export const getAllReviews = createAsyncThunk(
    "get/all/reviews",
    async () => {
      try {
        const response = await api.get("/get/all/reviews");
        return response.data;
      } catch (error) {
        console.log(error);
        
      }
    }
  );




  const getAllReviewsSlice = createSlice({
    name: "getAllReviewsSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllReviews.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllReviews.fulfilled, (state, action) => {
          state.isLoading = false;
          state.reviews = action.payload?.success?action.payload?.reviews:null;
        })
        .addCase(getAllReviews.rejected, (state, action) => {
          state.isLoading = false;
          state.reviews = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default getAllReviewsSlice.reducer;
  