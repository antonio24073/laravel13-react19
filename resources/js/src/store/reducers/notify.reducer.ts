import { createSlice } from '@reduxjs/toolkit';
import type { NotifyState } from '../../models/notify.types';

const initialState: NotifyState = {
  open: false,
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
    open: (state, action) => {
      state.open = true;
      state.msg = action.payload.msg;
      state.class = action.payload.class;
    },
    close: (state) => {
      state.open = false;
    },
  },
});

export const { open, close } = notifySlice.actions;

export default notifySlice.reducer;