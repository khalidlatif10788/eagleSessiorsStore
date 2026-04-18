import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  isLoading: false,
  banners:null
};


export const getAllBanners = createAsyncThunk(
    "get/all/banners",
    async () => {
      try {
        const response = await api.get("/get/all/banners");
        return response.data;
      } catch (error) {
        console.log(error);
        
      }
    }
  );




  const getAllBannersSlice = createSlice({
    name: "getAllBannersSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllBanners.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllBanners.fulfilled, (state, action) => {
          state.isLoading = false;
          state.banners = action.payload?.success?action.payload?.banners:null;
        })
        .addCase(getAllBanners.rejected, (state, action) => {
          state.isLoading = false;
          state.banners = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default getAllBannersSlice.reducer;
  