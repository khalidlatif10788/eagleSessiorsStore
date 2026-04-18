import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  isLoading: false,
  products:null
};


export const getAllProducts = createAsyncThunk(
    "get/products",
    async (obj) => {
      try {
        let a=Object.keys(obj);
        let b=Object.values(obj);
        let str="/products?";
          a.forEach((value,i)=>{str+=`${value}=${b[i]}&`})
          console.log(str);
          
        const response = await api.get(str);
        return response.data;
      } catch (error) {
        console.log(error);
        
      }
    }
  );



  const getAllProductsSlice = createSlice({
    name: "getAllProductsSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllProducts.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.products = action.payload?.success?action.payload?.products:null;
        })
        .addCase(getAllProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.products = false;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default getAllProductsSlice.reducer;
  