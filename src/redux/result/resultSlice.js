import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchResultApi, submitResultApi } from "../apis/resultapi";


export const submitResultAsync = createAsyncThunk(
  "result/submit",
  async ({ paperId, payload }, { rejectWithValue }) => {
    try {
      const res = await submitResultApi(paperId, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const fetchResultAsync = createAsyncThunk(
  "result/fetchByPaper",
  async (paperId, { rejectWithValue }) => {
    try {
      const res = await fetchResultApi(paperId);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

const resultSlice = createSlice({
  name: "result",
  initialState: {
    result: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearResult(state) {
      state.result = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResultAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResultAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload
      })
      .addCase(fetchResultAsync.rejected, (state, action) => {
        state.loading = false;
        state.result =null;
        state.error = action.payload || "Failed to fetch";
      })

      .addCase(submitResultAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitResultAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(submitResultAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Submit failed";
      });
  },
});

export const {clearResult}  = resultSlice.actions;
export default resultSlice.reducer;
