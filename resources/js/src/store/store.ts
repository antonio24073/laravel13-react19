import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counter.reducer'
import loadingReducer from './reducers/loading.reducer'

export default configureStore({
  reducer: {
    counter: counterReducer,
    loading: loadingReducer
  },
})