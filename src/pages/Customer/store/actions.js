import { actionType } from "./index";
import { createCustomer, deleteCustomerById } from "../../../api/customer";

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

const setCustomersList = (customerCount, customersList) => ({
  type: actionType.SET_DOCUMENTS_LIST,
  customerCount,
  customersList,
});

export const createCustomerAsync = (customer) => {
  return (dispatch) => {
    dispatch(setError(null));
    dispatch(setIsLoading(true));
    createCustomer(customer)
      .then((res) => {
        dispatch(setIsShowModal(false));
        // const { documentCount, documents } = res;
        console.log("1111111111111111111", res);
        // dispatch(setCustomersList(customerCount, customersList));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        console.log("errorr 2222222222222222", err.response.data);
        dispatch(setIsLoading(false));
        dispatch(setError(err));
      });
  };
};

export const deleteCustomerAsync = (id) => {
  return dispatch => {
      dispatch(setError(null));
      dispatch(setIsLoading(true));
      deleteCustomerById(id)
      .then((res) => {
        dispatch(setIsShowModal(false));
        // const { documentCount, documents } = res;
        console.log("3333333333333333333", res);
        // dispatch(setCustomersList(customerCount, customersList));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        console.log("errorr 44444444444444444", err.response.data);
        dispatch(setIsLoading(false));
        dispatch(setError(err));
      });
  }
}
