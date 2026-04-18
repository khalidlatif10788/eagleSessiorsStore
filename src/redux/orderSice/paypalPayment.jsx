import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import toast from "react-hot-toast";

const initialState = {
  paypalLoading: false,
  session:null
};


export const paypalPaymentCard = createAsyncThunk(
    "pay/with/paypal",
    async (data) => {
      try {
        const response = await api.post("/paypal/payments",data);
        return response.data;
      } catch (error) {
        console.log(error);
       return toast.error(error?.response?.data?.message)
        
      }
    }
  );



  const payWithPaypalCardSlice = createSlice({
    name: "payWithPaypalCardSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(paypalPaymentCard.pending, (state) => {
          state.paypalLoading = true;
        })
        .addCase(paypalPaymentCard.fulfilled, (state, action) => {
          state.paypalLoading = false;
          state.session = action.payload?action.payload?.links:null;
        })
        .addCase(paypalPaymentCard.rejected, (state, action) => {
          state.paypalLoading = false;
          state.session = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default payWithPaypalCardSlice.reducer;
  