import { createSlice } from '@reduxjs/toolkit';
import type { LoginState } from '../../models/login.types';
import { login } from '../thunks/login.thunk';
import { loginStorage } from '../storage/login.storage';

const accessToken = loginStorage.getAccessToken();
const refreshToken = loginStorage.getRefreshToken();

const initialState: LoginState = {
  accessToken,
  refreshToken,
  authenticated: !!accessToken,
  loading: false,
  error: null
};

export const loginSlice = createSlice({
  name: 'login',

  initialState,

  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.authenticated = false;
      state.error = null;

      loginStorage.clear();
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

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;