
import { createSlice } from '@reduxjs/toolkit';

export const modelSlice = createSlice({
  name: 'model',
  initialState: {
    selectedModel:{},
    isOpen:false,

  },
  reducers: {
    setSelectedModel: (state, action) => {
        state.isOpen=true;
      state.selectedModel = action.payload;
    },
    handleCloseModlePopup: (state) => {
      state.selectedModel = null;
      state.isOpen=false;
    },
  },
});


export const {setSelectedModel,handleCloseModlePopup} = modelSlice.actions;
export default modelSlice.reducer;