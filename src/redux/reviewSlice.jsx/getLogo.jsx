import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  isLoading: false,
  logo:null,
};


export const getLogo = createAsyncThunk(
    "get/logo",
    async () => {
      try {
        const response = await api.get("/get/logo");
        return response.data;
      } catch (error) {
        console.log(error);
        
      }
    }
  );




  const getLogoSlice = createSlice({
    name: "getLogoSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(getLogo.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getLogo.fulfilled, (state, action) => {
          state.isLoading = false;
          state.logo = action.payload?.success?action.payload?.logo:null;
        })
        .addCase(getLogo.rejected, (state, action) => {
          state.isLoading = false;
          state.logo = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default getLogoSlice.reducer;
  