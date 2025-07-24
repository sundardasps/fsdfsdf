import { combineReducers } from 'redux'
import counterReducer from './userSlice'

const rootReducer = combineReducers({
  counter: counterReducer,
  // add more reducers here
})

export default rootReducer
