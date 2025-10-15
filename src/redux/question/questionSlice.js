import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addQuestionApi, fetchQuestions } from "../apis/questionApi";

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
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchQuestionsAsync = createAsyncThunk(
  "paper/fetchQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchQuestions();
      console.log(response);
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
    builder.addCase(addQuestionAsync.fulfilled, (state, action) => {
      state.allQuestions.push(action.payload);
    });
     builder
      .addCase(fetchQuestionsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestionsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allQuestions = action.payload;
      })
      .addCase(fetchQuestionsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default questionSlice.reducer;
