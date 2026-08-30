
export interface LoginState {
  accessToken: string | null;
  refreshToken: string | null;
  authenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginModel {
    login: LoginState;
}

export interface LoginParams {
    email: string;
    password: string;
}