import { actionType } from "./index";
import { createCategory, deleteCategoryById, fetchCategories, updateCategory, fetchCategoriesByFliter } from "../../../api/category";

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

export const setCategoriesList = (categoriesList) => ({
  type: actionType.SET_CATEGORIES_LIST,
  // categoryCount,
  categoriesList,
});

export const loadCategoriesList = () => {
  console.log('--------------loadCategoriesList');
  return (dispatch) => {
    fetchCategories().then((data) => {
      console.log('--------------dispatch setCategoriesList');
      dispatch(setCategoriesList(data));
    });
  }
}

export const searchByFilterAsync = searchCondition => {
  console.log('--------------searchByFilterAsync searchCondition:', searchCondition);
  return dispatch => {
      dispatch(setError(null));
      dispatch(setIsLoading(true));
      fetchCategoriesByFliter(searchCondition)
          .then(data => {
            console.log('--------------createCategory in searchByFilterAsync');
            console.log('--------------dispatch setCategoriesList data:', data);
            dispatch(setCategoriesList(data));
            dispatch(setIsLoading(false));
            console.log('--------------end in searchByFilterAsync');
          })
          .catch(err => {
              dispatch(setIsLoading(false));
              dispatch(setError(err));
          })
  }
}

export const createCategoryAsync = (category) => {
  console.log('--------------createCategoryAsync');
  return (dispatch) => {
    dispatch(setError(null));
    dispatch(setIsLoading(true));
    createCategory(category)
      .then((res) => {
        console.log('--------------createCategory in createCategoryAsync');
        dispatch(loadCategoriesList());
        dispatch(setIsShowModal(false));
        dispatch(setIsLoading(false));
        console.log('--------------end in loadCategoriesList');
      })
      .catch((err) => {
        console.log("errorr in [createCategoryAsync]", err.response.data);
        dispatch(setIsLoading(false));
        dispatch(setError(err));
      });
  };
};

export const updateCategoryAsync = (id, category) => {
  console.log('--------------updateCategoryAsync');
  return (dispatch) => {
    dispatch(setError(null));
    dispatch(setIsLoading(true));
    updateCategory(id, category)
      .then((res) => {
        console.log('--------------updateCategory in updateCategoryAsync', res);
        dispatch(loadCategoriesList());
        dispatch(setIsShowModal(false));
        dispatch(setIsLoading(false));
        console.log('--------------end in loadCategoriesList');
      })
      .catch((err) => {
        console.log("errorr in [updateCategoryAsync]", err.response.data);
        dispatch(setIsLoading(false));
        dispatch(setError(err));
      });
  };
};

export const deleteCategoryAsync = (id) => {
  return dispatch => {
      dispatch(setError(null));
      dispatch(setIsLoading(true));
      deleteCategoryById(id)
      .then((res) => {
        dispatch(loadCategoriesList());
        dispatch(setIsShowModal(false));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        console.log("errorr in [deleteCategoryAsync]", err.response.data);
        dispatch(setIsLoading(false));
        dispatch(setError(err));
      });
  }
}
