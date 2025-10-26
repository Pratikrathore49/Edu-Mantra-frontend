import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quesExplainationApi } from "../apis/aiApi";
const initialState = {
  AllExplanations: {},
  loading: false,
  error: null,
};

export const quesExplainationAsync = createAsyncThunk(
  "ai/fetchQuesExplanation",
  async (ques, thunkAPI) => {
    try {
      const res = await quesExplainationApi(ques);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const aiSlice= createSlice({
  name: "ai",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(quesExplainationAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(quesExplainationAsync.fulfilled, (state, action) => {
        state.loading = false;
        const{explanation,question_id} = action.payload
        state.AllExplanations[question_id] = explanation; 
  
      })
      .addCase(quesExplainationAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default aiSlice.reducer;
