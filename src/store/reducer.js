import { combineReducers } from 'redux';
import { reducer as userReducer } from '../pages/User/store';

const reducer = combineReducers({
  userReducer
});

export default reducer;