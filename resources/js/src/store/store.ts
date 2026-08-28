import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counter.reducer'
import loadingReducer from './reducers/loading.reducer'
import alertReducer from './reducers/alert.reducer'
import notifyReducer from './reducers/notify.reducer'

export default configureStore({
  reducer: {
    counter: counterReducer,
    loading: loadingReducer,
    alert: alertReducer,
    notify: notifyReducer,
  },
})