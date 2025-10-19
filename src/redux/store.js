 import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/auth/authSlice';
import modelReducer from '../redux/model/modelSlice';
import quesReducer from '../redux/question/questionSlice';
import paperReducer from '../redux/paper/paperSlice';

        

export const store = configureStore({
  reducer: {
    auth: authReducer,
    model: modelReducer,
    question:quesReducer,
    paper:paperReducer
  },
});