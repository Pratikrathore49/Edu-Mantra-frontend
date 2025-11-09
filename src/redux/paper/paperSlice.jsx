import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addPaperApi,
  deletePapersApi,
  fetchAllPapersApi,
  fetchPaperByIdApi,
  updatePaperApi,
} from "../apis/paperApi";

const initialState = {
  allPapers: { papers: [], totalPages: 0 },
  onePaper: null,
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

export const updatePaperAsync = createAsyncThunk(
  "paper/updatePaper",
  async (data, thunkApi) => {
    try {
      const res = await updatePaperApi(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deletePapersAsync = createAsyncThunk(
  "paper/deletePaper",
  async (id, thunkApi) => {
    try {
      const res = await deletePapersApi(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchAllPapersAsync = createAsyncThunk(
  "paper/fetchAllPapers",
  async ({ skip, limit }, thunkApi) => {
    try {
      const res = await fetchAllPapersApi({ skip, limit });
      console.log("slice", res.data);
      return res.data; // ✅ should return { papers: [], totalPages }
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
      .addCase(addPaperAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPaperAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allPapers.papers.push(action.payload);
      })
      .addCase(addPaperAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAllPapersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPapersAsync.fulfilled, (state, action) => {
        state.loading = false;
        console.log("actioon ", action.payload);
        state.allPapers = action.payload;
      })
      .addCase(fetchAllPapersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch One Paper
      .addCase(fetchPaperByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaperByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.onePaper = action.payload;
      })
      .addCase(fetchPaperByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deletePapersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePapersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allPapers.papers = state.allPapers.papers.filter(
          (p) => p._id !== action.payload._id
        );
      })
      .addCase(deletePapersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatePaperAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePaperAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.allPapers.papers.findIndex(
          (i) => i._id === action.payload._id
        );
        state.allPapers.papers[index] = action.payload;
      })
      .addCase(updatePaperAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paperSlice.reducer;
