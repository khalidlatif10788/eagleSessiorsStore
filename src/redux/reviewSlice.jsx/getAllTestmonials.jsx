import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  isLoading: false,
  testimonials:null,
  noOfPendingOrders:null,
  noOfProducts:null,
  noOfUsers:null
};


export const getAllTestimonials = createAsyncThunk(
    "get/all/testimonials",
    async () => {
      try {
        const response = await api.get("/get/all/testimonials");
        return response.data;
      } catch (error) {
        console.log(error);
        
      }
    }
  );




  const getAllTestmonialsSlice = createSlice({
    name: "getAllTestmonialsSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllTestimonials.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllTestimonials.fulfilled, (state, action) => {
          state.isLoading = false;
          state.testimonials = action.payload?.success?action.payload?.testimonials:null;
          state.noOfPendingOrders = action.payload?.success?action.payload?.pendingOrders:null;
          state.noOfProducts = action.payload?.success?action.payload?.products:null;
          state.noOfUsers = action.payload?.success?action.payload?.users:null;
        })
        .addCase(getAllTestimonials.rejected, (state, action) => {
          state.isLoading = false;
          state.testimonials = null;
          state.noOfPendingOrders = null;
          state.noOfProducts = null;
          state.noOfUsers = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default getAllTestmonialsSlice.reducer;
  