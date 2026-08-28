export interface NotifyState {
    open: boolean;
    horizontal: 'left' | 'center' | 'right';
    vertical: 'top' | 'bottom';
    class: string;
    time: number;
    msg: string;
}

export interface NotifyModel {
    notify: NotifyState;
}