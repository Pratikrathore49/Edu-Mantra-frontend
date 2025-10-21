import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUserApi, registerStudentApi, registerTeacherApi, studentLoginApi,  teacherLoginApi,} from "../apis/authapi";

const initialState = {
    user: null,
    loading: false,
    error: null,
  }


export const studentLogin = createAsyncThunk(
  "auth/studentLogin",
  async (Credentials, { rejectWithValue }) => {
    try {
      const res = await studentLoginApi(Credentials);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerStudent = createAsyncThunk(
  "auth/registerStudent",
  async (studentData, { rejectWithValue }) => {
    try {
      const res = await registerStudentApi(studentData);
      console.log("Registration successful:", res);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const teacherLogin = createAsyncThunk(
  "auth/teacherLogin",
  async (Credentials, { rejectWithValue }) => {
    try {
      const res = await teacherLoginApi(Credentials);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerTeacher = createAsyncThunk(
  "auth/registerTeacher",
  async (teacherData, { rejectWithValue }) => {
    try {
      const res = await registerTeacherApi(teacherData);
      console.log("Registration successful:", res);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

 
export const checkUserAsync = createAsyncThunk('auth/checkUser',async(_,{rejectWithValue})=>{
  try{
       const res = await checkUserApi()
       return res.data
  }catch(error){
    return rejectWithValue(error.message)
  }
})



export const authSlice = createSlice({
  name: "auth",
 initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(studentLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(studentLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(studentLogin.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(registerStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(teacherLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(teacherLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(teacherLogin.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(registerTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(registerTeacher.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
  },
});

export default authSlice.reducer;
