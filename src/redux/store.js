 import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/auth/authSlice';
import modelReducer from '../redux/model/modelSlice'
        

export const store = configureStore({
  reducer: {
    auth: authReducer,
    model: modelReducer,
  },
});