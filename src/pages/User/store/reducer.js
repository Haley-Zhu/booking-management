import { actionType } from './index';
const initialState = {
  email: "",
  password: "",
};

const reducer = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case actionType.SAVE_LOGIN_INFO:
      newState = {
        ...state,
        payload: action.payload,
      };
      break;
    default:
      break;
  }
  return newState;
};

export default reducer;
