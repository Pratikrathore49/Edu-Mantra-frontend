import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addPaperApi, fetchAllPapersApi } from "../apis/paperApi";

const initialState = {
  allPapers: [],
  error: null,
  loading: false,
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
        state.loading = true;
      })

      .addCase(fetchAllPapersAsync.pending, (state, action) => {
        state.allPapers = [];
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchAllPapersAsync.rejected, (state, action) => {
        state.allPapers = [];
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllPapersAsync.fulfilled, (state, action) => {
        state.allPapers = action.payload;
        state.error = null;
        state.loading = true;
      });
  },
});

export default paperSlice.reducer;
