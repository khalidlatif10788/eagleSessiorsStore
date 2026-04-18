import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { getSingleProduct } from "./getsingleProductSlice";

const initialState = {
  isLoading: false,
  sku:null
};


export const getSingleSku = createAsyncThunk(
    "get/single/sku",
    async (queryString, { rejectWithValue }) => {
      try {
        const response = await api.get(`/sku?${queryString}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message });
      }
    }
  );



  const getSingleSkuSlice = createSlice({
    name: "getAllProductsSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(getSingleProduct.pending, (state) => {
          state.sku = null;
        })
        .addCase(getSingleSku.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getSingleSku.fulfilled, (state, action) => {
          state.isLoading = false;
          state.sku = action.payload?.success ? action.payload?.sku : null;
        })
        .addCase(getSingleSku.rejected, (state) => {
          state.isLoading = false;
          state.sku = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default getSingleSkuSlice.reducer;
  