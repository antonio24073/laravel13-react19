import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginParams } from "../../models/auth.types";
import axios from "axios";

export const login = createAsyncThunk(
    'auth/login',

    async ({ email, password }: LoginParams, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams();

            params.append('grant_type', 'password');
            params.append('client_id', '01a04d6a-431a-7103-b1cb-931eb3a545d3');
            params.append('client_secret', 'AKBMIDaT7tkxJ0wpQkLHUPAxqMKwzYp28efgAl9X');
            params.append('username', email);
            params.append('password', password);
            params.append('scope', '');

            const response = await axios.post(
                'http://localhost:8100/oauth/token',
                params
            );

            return response.data;

        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.error_description ||
                'Erro ao realizar login.'
            );
        }
    }
);

