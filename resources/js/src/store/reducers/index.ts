import { combineReducers } from 'redux'
import loadingReducer from './loading.reducer'
import notifyReducer from './notify.reducer'
import alertReducer from './alert.reducer'
import loginReducer from './login.reducer'
import counterReducer from './counter.reducer'
import registerReducer from './register.reducer'
import vehiclesReducer from './vehicles.reducer'


const rootReducer = combineReducers({
    loadingReducer,
    notifyReducer,
    alertReducer,
    loginReducer,
    counterReducer,
    registerReducer,
    vehiclesReducer
})

export default rootReducer;