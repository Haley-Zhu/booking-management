import { actionType } from "./index";
import {
  createBusiness,
  deleteBusinessById,
  fetchBusinesses,
  updateBusiness,
  fetchBusinessesByFliter,
  fetchBusinessesByCategoryId,
  addCategoryToBusiniess,
  deleteCategoryFromBusiness,
  fetchBusinessById,
} from "../../../api/business";

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

export const setBusinessesList = (businessesList) => ({
  type: actionType.SET_BUSINESSES_LIST,
  // businessCount,
  businessesList,
});

export const loadBusinessesList = () => {
  console.log("--------------loadBusinessesList");
  return (dispatch) => {
    fetchBusinesses().then((data) => {
      console.log("--------------dispatch setBusinessesList");
      dispatch(setBusinessesList(data));
    });
  };
};

export const loadBusinessesListByCategory = (categoryId) => {
  console.log("--------------loadBusinessesList categoryId: ", categoryId);
  return (dispatch) => {
    fetchBusinessesByCategoryId(categoryId).then(data => {
      console.log("--------------dispatch setBusinessesList");
      dispatch(setBusinessesList(data));
    })
  };
};

export const searchByFilterAsync = (searchCondition) => {
  console.log(
    "--------------searchByFilterAsync searchCondition:",
    searchCondition
  );
  return (dispatch) => {
    dispatch(setError(null));
    dispatch(setIsLoading(true));
    fetchBusinessesByFliter(searchCondition)
      .then((data) => {
        console.log("--------------createBusiness in searchByFilterAsync");
        console.log("--------------dispatch setBusinessesList data:", data);
        dispatch(setBusinessesList(data));
        dispatch(setIsLoading(false));
        console.log("--------------end in searchByFilterAsync");
      })
      .catch((err) => {
        dispatch(setIsLoading(false));
        dispatch(setError(err));
      });
  };
};

export const createBusinessAsync = (business) => {
  console.log("--------------createBusinessAsync");
  return (dispatch) => {
    dispatch(setError(null));
    dispatch(setIsLoading(true));
    createBusiness(business)
      .then((res) => {
        console.log("--------------createBusiness in createBusinessAsync");
        dispatch(loadBusinessesList());
        dispatch(setIsShowModal(false));
        dispatch(setIsLoading(false));
        console.log("--------------end in loadBusinessesList");
      })
      .catch((err) => {
        console.log("errorr in [createBusinessAsync]", err.response.data);
        dispatch(setIsLoading(false));
        dispatch(setError(err));
      });
  };
};

export const updateBusinessAsync = (id, business) => {
  console.log("--------------updateBusinessAsync");
  return (dispatch) => {
    dispatch(setError(null));
    dispatch(setIsLoading(true));
    updateBusiness(id, business)
      .then((res) => {
        console.log("--------------updateBusiness in updateBusinessAsync", res);
        dispatch(loadBusinessesList());
        dispatch(setIsShowModal(false));
        dispatch(setIsLoading(false));
        console.log("--------------end in loadBusinessesList");
      })
      .catch((err) => {
        console.log("errorr in [updateBusinessAsync]", err.response.data);
        dispatch(setIsLoading(false));
        dispatch(setError(err));
      });
  };
};

export const deleteBusinessAsync = (id) => {
  return (dispatch) => {
    dispatch(setError(null));
    dispatch(setIsLoading(true));
    deleteBusinessById(id)
      .then((res) => {
        dispatch(loadBusinessesList());
        dispatch(setIsShowModal(false));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        console.log("errorr in [deleteBusinessAsync]", err.response.data);
        dispatch(setIsLoading(false));
        dispatch(setError(err));
      });
  };
};

export const addCategorytoBusinessAysc = (businessId, categoryId) => {
  console.log("businessId, categoryId in [addCategorytoBusinessAysc]", businessId, categoryId);
  return (dispatch) => {
    // dispatch(setError(null));
    // dispatch(setIsLoading(true));
    addCategoryToBusiniess(businessId, categoryId)
      .then((res) => {
        console.log("res in [addCategorytoBusinessAysc]", res);
        dispatch(loadBusinessesList());
        // dispatch(setIsShowModal(false));
        // dispatch(setIsLoading(false));
      })
      .catch((err) => {
        console.log("errorr in [deleteBusinessAsync]", err.response.data);
        // dispatch(setIsLoading(false));
        // dispatch(setError(err));
      });
  };
};

export const deleteCategoryFromBusinessAync = (businessId, categoryId) => {
  console.log("businessId, categoryId in [deleteCategoryFromBusiness]", businessId, categoryId);
  return (dispatch) => {
    // dispatch(setError(null));
    // dispatch(setIsLoading(true));
    deleteCategoryFromBusiness(businessId, categoryId)
      .then((res) => {
        console.log("res in [deleteCategoryFromBusiness]", res);
        dispatch(loadBusinessesList());
        // dispatch(setIsShowModal(false));
        // dispatch(setIsLoading(false));
      })
      .catch((err) => {
        console.log("errorr in [deleteBusinessAsync]", err.response.data);
        // dispatch(setIsLoading(false));
        // dispatch(setError(err));deleteCategoryFromBusiness
      });
  };
};
