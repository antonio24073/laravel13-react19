export interface AlertState {
    open?: boolean,
    class?: string,
    time?: number,
    msg?: string
}

export interface AlertModel {
    alert: AlertState;
}