import { actionType } from './index';
const initialState = {
  username: "",
  password: "",
  remember: ""
};

const reducer = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case actionType.SAVE_LOGIN_INFO:
      newState = {
        ...state,
        ...action.payload
      };
      break;
    default:
      break;
  }
  return newState;
};

export default reducer;
