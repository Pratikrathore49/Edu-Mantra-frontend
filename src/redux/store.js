 import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/auth/authSlice';
import modelReducer from '../redux/model/modelSlice';
import quesReducer from '../redux/question/questionSlice';
import paperReducer from '../redux/paper/paperSlice';
import resultReducer from '../redux/result/resultSlice';
import aiReducer from '../redux/ai/aiSlice'

        

export const store = configureStore({
  reducer: {
    auth: authReducer,
    model: modelReducer,
    question:quesReducer,
    paper:paperReducer,
    result:resultReducer,
    ai:aiReducer,
  },
});