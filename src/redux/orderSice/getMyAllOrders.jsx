import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import toast from "react-hot-toast";

const initialState = {
  isLoading: false,
  orders:null
};


export const getAllMyOrders = createAsyncThunk(
    "get/all/my/orders",
    async () => {
      try {
        const response = await api.get("/get/my/order");
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
      }
    }
  );



  const getAllMyOrdersCodSlice = createSlice({
    name: "getAllMyOrdersCodSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllMyOrders.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllMyOrders.fulfilled, (state, action) => {
          state.isLoading = false;
          state.orders = action.payload?.success?action.payload?.myOrders:null;
        })
        .addCase(getAllMyOrders.rejected, (state, action) => {
          state.isLoading = false;
          state.orders = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default getAllMyOrdersCodSlice.reducer;
  