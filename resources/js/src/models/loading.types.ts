export interface LoadingState {
        open: boolean;
        msg?: string
}

export interface LoadingModel {
    loading: LoadingState;
}