import { createSlice } from '@reduxjs/toolkit';
import type { LoadingModel } from '../../models/LoadingModel';


const loadingModel: LoadingModel = {
  loading: {
    opened: true,
    msg: 'Carregando...',
  }
}


export const loadingSlice = createSlice({
  name: 'loading',
  initialState: loadingModel.loading,
  reducers: {
    open: (state) => {
      state.opened = true;
    },
    close: (state) => {
      state.opened = false;
    },
  },
});

export const { open, close } = loadingSlice.actions;

export default loadingSlice.reducer;