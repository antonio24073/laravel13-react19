import { createSlice } from '@reduxjs/toolkit';
import type { AuthState, LoginParams } from '../../models/auth.types';
import { login } from '../thunks/auth.thunk';
import { authStorage } from '../storage/auth.storage';

const accessToken = authStorage.getAccessToken();
const refreshToken = authStorage.getRefreshToken();

const initialState: AuthState = {
  accessToken,
  refreshToken,
  authenticated: !!accessToken,
  loading: false,
  error: null
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

      authStorage.clear();
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