import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth.reducer'
import counterReducer from './reducers/counter.reducer'
import loadingReducer from './reducers/loading.reducer'
import alertReducer from './reducers/alert.reducer'
import notifyReducer from './reducers/notify.reducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    loading: loadingReducer,
    alert: alertReducer,
    notify: notifyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;