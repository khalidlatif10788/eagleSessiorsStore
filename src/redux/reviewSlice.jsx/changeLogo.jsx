import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import toast from "react-hot-toast";

const initialState = {
  isLoading: false,
  message:null
};


export const changeLogo = createAsyncThunk(
    "change/logo",
    async (data) => {
      try {
        const response = await api.put("/change/logo",data);
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message)
        
      }
    }
  );




  const changeLogoSlice = createSlice({
    name: "changeLogoSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(changeLogo.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(changeLogo.fulfilled, (state, action) => {
          state.isLoading = false;
          state.message = action.payload?.success?action.payload?.message:null;
        })
        .addCase(changeLogo.rejected, (state, action) => {
          state.isLoading = false;
          state.message = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default changeLogoSlice.reducer;
  