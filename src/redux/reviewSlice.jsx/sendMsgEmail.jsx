import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import toast from "react-hot-toast";

const initialState = {
  isLoading: false,
  message:null
};


export const sendEmailForMsg = createAsyncThunk(
    "send/email/message",
    async (data) => {
      try {
        const response = await api.post("/send/message",data);
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message)
        
      }
    }
  );




  const sendMsgEmailSlice = createSlice({
    name: "sendMsgEmailSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(sendEmailForMsg.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(sendEmailForMsg.fulfilled, (state, action) => {
          state.isLoading = false;
          state.message = action.payload?.success?action.payload?.message:null;
        })
        .addCase(sendEmailForMsg.rejected, (state, action) => {
          state.isLoading = false;
          state.message = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default sendMsgEmailSlice.reducer;
  