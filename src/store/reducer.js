import { combineReducers } from 'redux';
import { reducer as userReducer } from '../pages/User/store';
import { reducer as customerReducer } from '../pages/Customer/store';

const reducer = combineReducers({
  userReducer,
  customerReducer
});

export default reducer;