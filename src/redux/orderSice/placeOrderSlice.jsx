import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import toast from "react-hot-toast";

const initialState = {
  isLoading: false,
  message:null
};


export const placeOrderWithCod = createAsyncThunk(
    "place/order",
    async (data) => {
      try {
        const response = await api.post("/place/order/with/cod",data);
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message)
        
      }
    }
  );



  const placeOrderWithCodSlice = createSlice({
    name: "placeOrderWithCodSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(placeOrderWithCod.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(placeOrderWithCod.fulfilled, (state, action) => {
          state.isLoading = false;
          state.message = action.payload?.success?action.payload?.message:null;
        })
        .addCase(placeOrderWithCod.rejected, (state, action) => {
          state.isLoading = false;
          state.message = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default placeOrderWithCodSlice.reducer;
  