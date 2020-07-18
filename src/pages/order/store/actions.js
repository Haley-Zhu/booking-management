import { actionType } from "./index";
import { createOrder, deleteOrderById, fetchOrders, updateOrder, fetchOrdersByFliter } from "../../../api/order";
import { message } from "antd";

export const setIsShowModal = (modalVisible) => ({
  type: actionType.SET_IS_SHOW_MODAL,
  modalVisible,
});

export const setIsLoading = (isLoading) => ({
  type: actionType.SET_IS_LOADING,
  isLoading,
});

export const setError = (errorInfo) => ({
  type: actionType.SET_ERROR,
  errorInfo,
});

export const setOrdersList = (ordersList) => ({
  type: actionType.SET_ORDERS_LIST,
  // orderCount,
  ordersList,
});

export const loadOrdersList = () => {
  console.log('--------------loadOrdersList');
  return (dispatch) => {
    fetchOrders().then((data) => {
      console.log('--------------dispatch setOrdersList');
      dispatch(setOrdersList(data));
    });
  }
}

export const searchByFilterAsync = searchCondition => {
  console.log('--------------searchByFilterAsync searchCondition:', searchCondition);
  return dispatch => {
      dispatch(setError(null));
      dispatch(setIsLoading(true));
      fetchOrdersByFliter(searchCondition)
          .then(data => {
            console.log('--------------createOrder in searchByFilterAsync');
            console.log('--------------dispatch setOrdersList data:', data);
            dispatch(setOrdersList(data));
            dispatch(setIsLoading(false));
            console.log('--------------end in searchByFilterAsync');
          })
          .catch(err => {
              dispatch(setIsLoading(false));
              dispatch(setError(err));
          })
  }
}

export const createOrderAsync = (order) => {
  console.log('--------------createOrderAsync');
  return (dispatch) => {
    dispatch(setError(null));
    dispatch(setIsLoading(true));
    createOrder(order)
      .then((res) => {
        console.log('--------------createOrder in createOrderAsync');
        dispatch(loadOrdersList());
        // dispatch(setIsShowModal(false));
        dispatch(setIsLoading(false));
        message.success("A new order has been succefully created.");
        console.log('--------------end in loadOrdersList');
      })
      .catch((err) => {
        console.log("errorr in [createOrderAsync]", err.response.data);
        dispatch(setIsLoading(false));
        dispatch(setError(err));
        message.error(`Create order failed. [${err.response.data}]`);
      });
  };
};

export const updateOrderAsync = (id, order) => {
  console.log('--------------updateOrderAsync');
  return (dispatch) => {
    dispatch(setError(null));
    dispatch(setIsLoading(true));
    updateOrder(id, order)
      .then((res) => {
        console.log('--------------updateOrder in updateOrderAsync', res);
        dispatch(loadOrdersList());
        dispatch(setIsShowModal(false));
        dispatch(setIsLoading(false));
        console.log('--------------end in loadOrdersList');
      })
      .catch((err) => {
        console.log("errorr in [updateOrderAsync]", err.response.data);
        dispatch(setIsLoading(false));
        dispatch(setError(err));
      });
  };
};

export const deleteOrderAsync = (id) => {
  return dispatch => {
      dispatch(setError(null));
      dispatch(setIsLoading(true));
      deleteOrderById(id)
      .then((res) => {
        dispatch(loadOrdersList());
        dispatch(setIsShowModal(false));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        console.log("errorr in [deleteOrderAsync]", err.response.data);
        dispatch(setIsLoading(false));
        dispatch(setError(err));
      });
  }
}
