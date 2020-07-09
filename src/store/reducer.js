import { combineReducers } from 'redux';
import { reducer as userReducer } from '../pages/User/store';
import { reducer as customerReducer } from '../pages/Customer/store';
import { reducer as businessReducer } from '../pages/Business/store';
import { reducer as categoryReducer } from '../pages/Category/store';
// import { reducer as orderReducer } from '../pages/Order/store';

const reducer = combineReducers({
  userReducer,
  customerReducer,
  businessReducer,
  categoryReducer,
  // orderReducer
});

export default reducer;