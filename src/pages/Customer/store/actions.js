import { actionType } from "./index";
import { createCustomer, deleteCustomerById, fetchCustomers } from "../../../api/customer";

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

export const setCustomersList = (customersList) => ({
  type: actionType.SET_CUSTOMERS_LIST,
  // customerCount,
  customersList,
});

export const loadCustomersList = () => {
  console.log('--------------loadCustomersList');
  return (dispatch) => {
    fetchCustomers().then((data) => {
      console.log('--------------dispatch setCustomersList');
      dispatch(setCustomersList(data));
    });
  }
}

export const createCustomerAsync = (customer) => {
  console.log('--------------createCustomerAsync');
  return (dispatch) => {
    dispatch(setError(null));
    dispatch(setIsLoading(true));
    createCustomer(customer)
      .then((res) => {
        console.log('--------------createCustomer in createCustomerAsync');
        dispatch(loadCustomersList());
        dispatch(setIsShowModal(false));
        dispatch(setIsLoading(false));
        console.log('--------------end in loadCustomersList');
      })
      .catch((err) => {
        console.log("errorr in [createCustomerAsync]", err.response.data);
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
        dispatch(loadCustomersList());
        dispatch(setIsShowModal(false));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        console.log("errorr in [deleteCustomerAsync]", err.response.data);
        dispatch(setIsLoading(false));
        dispatch(setError(err));
      });
  }
}