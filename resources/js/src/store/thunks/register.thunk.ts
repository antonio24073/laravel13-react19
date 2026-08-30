import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
    RegisterErrors,
    RegisterParams,
    RegisterResponse
} from '../../models/register.types';
import { Http } from '../../config/Http';
import loadingAction from '../actions/loading.action';

export const register = createAsyncThunk<
    RegisterResponse,
    RegisterParams,
    {
        rejectValue: RegisterErrors;
    }
>(
    'register/register',
    async ({ name, email, password, password_confirmation }, { rejectWithValue, dispatch }) => {
        dispatch(
            loadingAction.open()
        );
        try {
            const response = await Http.post('/api/register', {
                name,
                email,
                password,
                password_confirmation,
            });
            
            return response.data;

        } catch (error: any) {
            
            return rejectWithValue(
                error.response?.data?.errors ?? {
                    general: [
                        'Erro ao realizar cadastro.'
                    ]
                }
            );
            
        } finally {
            dispatch(loadingAction.close());
        }
    }
);