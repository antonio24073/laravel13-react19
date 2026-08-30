import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginParams } from "../../models/login.types";
import { loginStorage } from "../storage/login.storage";
import { Http } from "../../config/Http";
import loadingAction from "../actions/loading.action";


export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: LoginParams, { rejectWithValue, dispatch }) => {
        dispatch(
            loadingAction.open()
        );
        try {
            const response = await Http.post('/api/login', {
                email,
                password,
            });

            console.log(response)
            loginStorage.setTokens(
                response.data.access_token,
                response.data.refresh_token
            );

            return response.data;

        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.error_description ||
                'Erro ao realizar login.'
            );
        } finally {
            dispatch(loadingAction.close());
        }
    }
);
