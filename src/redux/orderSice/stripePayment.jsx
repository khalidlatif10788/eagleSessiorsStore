import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import toast from "react-hot-toast";

const initialState = {
  payLoading: false,
  session:null
};


export const stripePaymentCard = createAsyncThunk(
    "pay/with/cart/stripe",
    async (data) => {
      try {
        const response = await api.post("/stripe/payment/card",data);
        return response.data;
      } catch (error) {
        console.log(error);
       return toast.error(error?.response?.data?.message)
        
      }
    }
  );



  const payWithStripeCardSlice = createSlice({
    name: "payWithStripeCardSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(stripePaymentCard.pending, (state) => {
          state.payLoading = true;
        })
        .addCase(stripePaymentCard.fulfilled, (state, action) => {
          state.payLoading = false;
          state.session = action.payload?.success?action.payload?.session:null;
        })
        .addCase(stripePaymentCard.rejected, (state, action) => {
          state.payLoading = false;
          state.session = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default payWithStripeCardSlice.reducer;
  