import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  isProductLoading: false,
  product:null,
  skus:null
};


export const getSingleProduct = createAsyncThunk(
    "get/single/product",
    async (id) => {
      try {
        const response = await api.get(`/product/${id}`);
        return response.data;
      } catch (error) {
        console.log(error);
        
      }
    }
  );



  const getSingleProductSlice = createSlice({
    name: "getSingleProductSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(getSingleProduct.pending, (state) => {
          state.isProductLoading = true;
        })
        .addCase(getSingleProduct.fulfilled, (state, action) => {
          state.isProductLoading = false;
          state.product = action.payload?.success?action.payload?.product:null;
          state.skus = action.payload?.success?action.payload?.skus:null;
        })
        .addCase(getSingleProduct.rejected, (state, action) => {
          state.isProductLoading = false;
          state.product = null;
          state.skus = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default getSingleProductSlice.reducer;
  