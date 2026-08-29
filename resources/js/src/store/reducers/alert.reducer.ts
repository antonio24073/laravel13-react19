import { createSlice } from '@reduxjs/toolkit';
import type { AlertState } from '../../models/alert.types';

const state: AlertState = {
    open: true,
    class: 'success',
    time: 3000,
    msg: 'Dados Atualizados'
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState: state,
  reducers: {
    open: (state, action) => {
      state.open = true;
    },
    close: (state) => {
      state.open = false;
    },
  },
});

export const { open, close } = alertSlice.actions;


export default alertSlice.reducer;

