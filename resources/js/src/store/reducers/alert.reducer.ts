import { createSlice } from '@reduxjs/toolkit';
import type { AlertModel } from '../../models/AlertModel';

const state: AlertModel = {
  alert: {
    open: true,
    class: 'success',
    time: 3000,
    msg: 'Dados Atualizados'
  }
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState: state.alert,
  reducers: {
    open: (state) => {
      state.open = true;
    },
    close: (state) => {
      state.open = false;
    },
  },
});

export const { open, close } = alertSlice.actions;

export default alertSlice.reducer;