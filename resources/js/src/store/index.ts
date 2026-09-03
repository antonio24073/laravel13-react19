import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './reducers/login.reducer'
import counterReducer from './reducers/counter.reducer'
import loadingReducer from './reducers/loading.reducer'
import alertReducer from './reducers/alert.reducer'
import notifyReducer from './reducers/notify.reducer'
import registerReducer from './reducers/register.reducer'
import vehiclesReducer from './reducers/vehicles.reducer'
import vehiclesFieldsReducer from './reducers/vehicles-fields.reducer'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    counter: counterReducer,
    loading: loadingReducer,
    alert: alertReducer,
    notify: notifyReducer,
    register: registerReducer,
    vehicles: vehiclesReducer,
    vehiclesFields: vehiclesFieldsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;