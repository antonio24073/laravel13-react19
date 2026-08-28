import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counter.reducer'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})