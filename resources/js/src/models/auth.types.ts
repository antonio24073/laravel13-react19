
export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  authenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface AuthModel {
    auth: AuthState;
}

export interface LoginParams {
    email: string;
    password: string;
}