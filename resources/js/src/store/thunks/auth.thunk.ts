import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginParams } from "../../models/auth.types";
import axios from "axios";
import { authStorage } from "../storage/auth.storage";


export const login = createAsyncThunk(
    'auth/login',

    async ({ email, password }: LoginParams, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/login', {
                email,
                password,
            });

            console.log(response)
            authStorage.setTokens(
                response.data.json.access_token,
                response.data.json.refresh_token
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
