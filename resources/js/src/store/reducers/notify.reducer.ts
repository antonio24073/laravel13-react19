import { createSlice } from '@reduxjs/toolkit';
import type { NotifyState } from '../../models/NotifyModel';

const initialState: NotifyState = {
  open: true,
  horizontal: 'center',
  vertical: 'top',
  class: 'success',
  time: 3000,
  msg: 'dados atualizados',
};

export const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    open: (state) => {
      state.open = true;
    },
    close: (state) => {
      state.open = false;
    },
  },
});

export const { open, close, changeNotify } = notifySlice.actions;

export default notifySlice.reducer;