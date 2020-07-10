import { actionType } from "./index";
const initialState = {
  modalVisible: false,
  orderCount: 0,
  ordersList: [],
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
      case actionType.SET_ORDERS_LIST:
      const { ordersList } = action;
      newState = {
        ...state,
        ordersList,
      };
      break;
    default:
      break;
  }
  console.log("store in [Order reducer]", newState);
  return newState;
};

export default reducer;
