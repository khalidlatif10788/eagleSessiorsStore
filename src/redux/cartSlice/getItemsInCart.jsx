import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  isLoading: false,
  cart:null
};


export const getAllSkusForCart = createAsyncThunk(
    "get/cart/skus",
    async (data) => {
      try {
        const response = await api.post("/get/cart/skus",data);
        return response.data;
      } catch (error) {
        console.log(error);
        
      }
    }
  );



  const getCartSkusSlice = createSlice({
    name: "getCartSkusSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllSkusForCart.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllSkusForCart.fulfilled, (state, action) => {
          state.isLoading = false;
          state.cart = action.payload?.success?action.payload?.findedSkus:null;
        })
        .addCase(getAllSkusForCart.rejected, (state, action) => {
          state.isLoading = false;
          state.cart = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default getCartSkusSlice.reducer;
  