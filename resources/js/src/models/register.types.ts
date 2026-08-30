export interface RegisterParams {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface RegisterResponse {
    access_token: string;
    refresh_token: string;
}

export interface RegisterErrors {
    name?: string[];
    email?: string[];
    password?: string[];
    password_confirmation?: string[];
    general?: string[];
}

export interface RegisterState {
    loading: boolean;
    success: boolean;
    error: RegisterErrors | null;
}
