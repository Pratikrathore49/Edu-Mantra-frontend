
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addQuestionApi,
  deleteQuestionApi,
  fetchQuestionsApi,
  updateQuestionApi,
} from "../apis/questionApi";

const initialState = {
  allQuestions: { questions: [], totalPages: 0 },
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
  "question/fetchQuestions",
  async ({ skip, limit }, { rejectWithValue }) => {
    try {
      const response = await fetchQuestionsApi({ skip, limit });
      return response; // should contain { questions, totalPages }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteQuestionAsync = createAsyncThunk(
  "question/deleteQuestion",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteQuestionApi(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateQuestionAsync = createAsyncThunk(
  "question/updateQuestion",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateQuestionApi(data);
      return response.data;
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
      .addCase(addQuestionAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addQuestionAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allQuestions.questions.push(action.payload);
      })
      .addCase(addQuestionAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchQuestionsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allQuestions = action.payload;
      })
      .addCase(fetchQuestionsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteQuestionAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteQuestionAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allQuestions.questions = state.allQuestions.questions.filter(
          (q) => q._id !== action.payload._id
        );
      })
      .addCase(deleteQuestionAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateQuestionAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateQuestionAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.allQuestions.questions.findIndex((item)=>item._id === action.payload._id)
         state.allQuestions.questions[index] = action.payload
      })
      .addCase(updateQuestionAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });






  },
});

export default questionSlice.reducer;
