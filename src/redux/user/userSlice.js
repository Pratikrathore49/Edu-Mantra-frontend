import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getStudentDetailsApi,
  getTeacherDetailsApi,
  updateStudentDetailsApi,
} from "../apis/userApi";

const initialState = {
  user: null,
  loading: true,
  error: null,
};

export const getStudentProfileAsync = createAsyncThunk(
  "user/getStudentProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getStudentDetailsApi();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTeacherProfileAsync = createAsyncThunk(
  "user/getTeacherProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getTeacherDetailsApi();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStudentDetailsAsync = createAsyncThunk(
  "user/updateStudentProfile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await updateStudentDetailsApi(data);
      return res.data;
    } catch (error) {
      console.log("error thunk",error)
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeacherProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeacherProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(getTeacherProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })

      .addCase(getStudentProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getStudentProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateStudentDetailsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudentDetailsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateStudentDetailsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
