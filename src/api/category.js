import { get, post, del, put }  from './axios';
import { SEARCH_ALL } from '../utils/constants';
// import axios from 'axios';
const API_CATEGORY_URL = '/categories'
const getApiCategoryUrlWithId = id => `${API_CATEGORY_URL}/${id}`;

export const fetchCategoryById = (id) => {
  console.log("--------------fetchCategoryById: ", id);
  const url = getApiCategoryUrlWithId(id);
  return get(url).then((res) => {
    console.log("--------------fetchCategoryById: res.data", res.data);
    return res.data;
  });
};

export const fetchCategories = () => {
  console.log('--------------fetchCategories');
  return get(API_CATEGORY_URL).then(res => {
    console.log('--------------fetchCategories, ret.data', res.data);
    return res.data;
  })
}

export function fetchCategoriesByFliter(searchCondition = { searchField: {SEARCH_ALL} }) {
  const { searchValue, searchField } = searchCondition;
  console.log('--------------fetchCategoriesByFliter', searchValue, searchField);
  return get(API_CATEGORY_URL, { params: {searchValue, searchField}}).then(res => {
    console.log('--------------fetchCategoriesByFliter, res.data:', res.data);
    return res.data;
  })
}

export const createCategory = (category) => {
  console.log('--------------createCategory: ', category);
  return post(API_CATEGORY_URL, category).then(res => {
    return res;
  });
}

export const updateCategory = (id, category) => {
  console.log('--------------updateCategory', id, category);
  return put(`${API_CATEGORY_URL}/${id}`, category).then(res => {
    return res;
  });
}

export const deleteCategoryById = (id) => {
  const url = getApiCategoryUrlWithId(id);
  console.log('--------------deleteCategoryById', id, url);
  return del(url).then(res => {
    return res;
  });
}