import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addQuestionApi, fetchQuestionsApi } from "../apis/questionApi";

const initialState = {
  allQuestions: [],
  loading: false,
  error: null,
};

export const addQuestionAsync = createAsyncThunk(
  "question/addQues",
  async (data, thunkAPI) => {
    try {
      const res = await addQuestionApi(data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchQuestionsAsync = createAsyncThunk(
  "paper/fetchQuestions",
  async ({ skip, limit }, { rejectWithValue }) => {
    try {
      const response = await fetchQuestionsApi({ skip, limit });

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addQuestionAsync.fulfilled, (state, action) => {
        state.allQuestions.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addQuestionAsync.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.allQuestions = [];
      })
      .addCase(addQuestionAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.allQuestions = [];
      });
    builder
      .addCase(fetchQuestionsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.allQuestions = [];
      })
      .addCase(fetchQuestionsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.allQuestions = action.payload;
      })
      .addCase(fetchQuestionsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.allQuestions = [];
      });
  },
});

export default questionSlice.reducer;
