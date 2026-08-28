import { createSlice } from '@reduxjs/toolkit';
import type { LoadingModel } from '../../models/LoadingModel';

const state: LoadingModel = {
  loading: {
    open: true,
    msg: 'Carregando...',
  }
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: state.loading,
  reducers: {
    open: (state) => {
      state.open = true;
    },
    close: (state) => {
      state.open = false;
    },
  },
});

export const { open, close } = loadingSlice.actions;

export default loadingSlice.reducer;