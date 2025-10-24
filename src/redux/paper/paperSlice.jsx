import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addPaperApi,
  fetchAllPapersApi,
  fetchPaperByIdApi,
} from "../apis/paperApi";

const initialState = {
  allPapers: [],
  onePaper: null,
  error: null,
  loading: true,
};

export const addPaperAsync = createAsyncThunk(
  "paper/addPaper",
  async (data, thunkApi) => {
    try {
      const res = await addPaperApi(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchAllPapersAsync = createAsyncThunk(
  "paper/fetchPaper",
  async (_, thunkApi) => {
    try {
      const res = await fetchAllPapersApi();
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchPaperByIdAsync = createAsyncThunk(
  "paper/fetchPaperById",
  async (id, thunkApi) => {
    try {
      const res = await fetchPaperByIdApi(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const paperSlice = createSlice({
  name: "paper",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPaperAsync.pending, (state, action) => {
        state.allPapers = [];
        state.error = null;
        state.loading = true;
      })
      .addCase(addPaperAsync.rejected, (state, action) => {
        state.allPapers = [];
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addPaperAsync.fulfilled, (state, action) => {
        state.allPapers.push(action.payload);
        state.error = null;
        state.loading = false;
      })

      .addCase(fetchAllPapersAsync.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchAllPapersAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllPapersAsync.fulfilled, (state, action) => {
        state.allPapers = action.payload;
        state.error = null;
        state.loading = false;
      })

      .addCase(fetchPaperByIdAsync.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchPaperByIdAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchPaperByIdAsync.fulfilled, (state, action) => {
        state.onePaper = action.payload;
        state.error = null;
        state.loading = false;
      });
  },
});

export default paperSlice.reducer;
