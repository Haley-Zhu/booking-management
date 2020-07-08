import { actionType } from "./index";
const initialState = {
  modalVisible: false,
  businessCount: 0,
  businessesList: [],
  errorInfo: "",
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case actionType.SET_IS_SHOW_MODAL:
      const { modalVisible } = action;
      newState = {
        ...state,
        modalVisible,
      };
      break;
      // case actionType.SET_IS_SHOW_DELETE_MODAL:
      // // const { modalVisible } = action;
      // newState = {
      //   ...state,
      //   modalVisible,
      // };
      // break;
      case actionType.SET_ERROR:
      const { errorInfo } = action;
      newState = {
        ...state,
        errorInfo,
      };
      break;
      case actionType.SET_IS_LOADING:
      const { isLoading } = action;
      newState = {
        ...state,
        isLoading,
      };
      break;
      case actionType.SET_BUSINESSES_LIST:
      const { businessesList } = action;
      newState = {
        ...state,
        businessesList,
      };
      break;
    default:
      break;
  }
  console.log("store in [Business reducer]", newState);
  return newState;
};

export default reducer;
