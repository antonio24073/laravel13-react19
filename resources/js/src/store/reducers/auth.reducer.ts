import { createSlice } from '@reduxjs/toolkit';
import type { AuthState } from '../../models/auth.types';
import { login } from '../thunks/auth.thunk';


const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  authenticated: false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.authenticated = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = true;

        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.authenticated = false;

        state.error =
          action.payload as string ||
          'Erro ao realizar login.';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;