import { createSlice } from '@reduxjs/toolkit';
import { register } from '../thunks/register.thunk';
import type { RegisterState } from '../../models/register.types';

const initialState: RegisterState = {
    loading: false,
    success: false,
    error: null,
};

export const registerSlice = createSlice({
    name: 'register',

    initialState,

    reducers: {
        clearRegisterState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

            .addCase(register.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })

            .addCase(register.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })

            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error =
                    action.payload ??
                    'Erro ao realizar cadastro.';
            });
    },
});

export const { clearRegisterState } = registerSlice.actions;

export default registerSlice.reducer;