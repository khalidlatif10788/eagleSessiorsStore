import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import api from "../../services/api";

const initialState = {
  isLoading: false,
  message:null
};


export const addTestimonialAdmin = createAsyncThunk(
    "add/admin/testimonial",
    async (data) => {
      try {
        const response = await api.post("/add/a/testimonial",data);
        return response.data;
      } catch (error) {
        console.log(error);
        return toast.error(error.response.data.message)
      }
    }
  );
export const deleteTestimonialAdmin = createAsyncThunk(
    "delete/admin/testimonial",
    async (id) => {
      try {
        const response = await api.delete(`/delete/a/testimonial/${id}`);
        return response.data;
      } catch (error) {
        console.log(error);
        
      }
    }
  );




  const testimonialSlice = createSlice({
    name: "testimonialSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(addTestimonialAdmin.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(addTestimonialAdmin.fulfilled, (state, action) => {
          state.isLoading = false;
          state.message = action.payload?.success?action.payload?.message:null;
        })
        .addCase(addTestimonialAdmin.rejected, (state, action) => {
          state.isLoading = false;
          state.message = null;
        })
        .addCase(deleteTestimonialAdmin.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteTestimonialAdmin.fulfilled, (state, action) => {
          state.isLoading = false;
          state.message = action.payload?.success?action.payload?.message:null;
        })
        .addCase(deleteTestimonialAdmin.rejected, (state, action) => {
          state.isLoading = false;
          state.message = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default testimonialSlice.reducer;
  