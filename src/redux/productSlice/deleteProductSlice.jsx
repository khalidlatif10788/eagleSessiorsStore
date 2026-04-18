import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  isLoading: false,
  message:null
};


export const deleteProductt = createAsyncThunk(
    "delete/product",
    async (id) => {
      try {
        const response = await api.delete(`/admin/product/${id}`);
        return response.data;
      } catch (error) {
        console.log(error);
        return toast.error(error.response.data.message)
        
      }
    }
  );



  const deleteProductSlice = createSlice({
    name: "getAllProductsSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(deleteProductt.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteProductt.fulfilled, (state, action) => {
          state.isLoading = false;
          state.message = action.payload?.success?action.payload?.message:null;
        })
        .addCase(deleteProductt.rejected, (state, action) => {
          state.isLoading = false;
          state.message = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default deleteProductSlice.reducer;
  