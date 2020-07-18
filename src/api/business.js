import { get, post, del, put } from "./axios";
import { SEARCH_ALL } from "../utils/constants";
// import axios from 'axios';
const API_BUSINESS_URL = "/businesses";
const getApiBusinessUrlWithId = (id) => `${API_BUSINESS_URL}/${id}`;

export const fetchBusinessById = (id) => {
  console.log("--------------fetchBusinessById: ", id);
  const url = getApiBusinessUrlWithId(id);
  return get(url).then((res) => {
    console.log("--------------fetchBusinessById: res.data", res.data);
    return res.data;
  });
};

export const fetchBusinesses = () => {
  console.log("--------------fetchBusinesses");
  return get(API_BUSINESS_URL).then((res) => {
    return res.data;
  });
};

export function fetchBusinessesByFliter(
  searchCondition = { searchField: { SEARCH_ALL } }
) {
  const { searchValue, searchField } = searchCondition;
  console.log(
    "--------------fetchBusinessesByFliter",
    searchValue,
    searchField
  );
  return get(API_BUSINESS_URL, { params: { searchValue, searchField } }).then(
    (res) => {
      console.log("--------------fetchBusinessesByFliter, res.data:", res.data);
      return res.data;
    }
  );
}

export function fetchBusinessesByCategoryId(categoryId) {
  console.log("-------------- fetchBusinessesByCategory", categoryId);
  return get(`${API_BUSINESS_URL}/categories/${categoryId}`).then((res) => {
    console.log("--------------fetchBusinessesByCategory, res.data:", res.data);
    return res.data;
  });
}

export const createBusiness = (business) => {
  console.log("--------------createBusiness, business:", business);
  return post(API_BUSINESS_URL, business).then((res) => {
    return res;
  });
};

export const updateBusiness = (id, business) => {
  console.log("--------------updateBusiness", id, business);
  return put(`${API_BUSINESS_URL}/${id}`, business).then((res) => {
    return res;
  });
};

export const deleteBusinessById = (id) => {
  const url = getApiBusinessUrlWithId(id);
  console.log("--------------deleteBusinessById", id, url);
  return del(url).then((res) => {
    return res;
  });
};

export const addCategoryToBusiniess = (businessId, categoryId) => {
  const url = getApiBusinessUrlWithId(businessId);
  console.log("--------------addCategoryToBusiniess", businessId, categoryId);
  return post(`${url}/categories/${categoryId}`, {
    params: { businessId: businessId, categoryId: categoryId },
  }).then((res) => {
    return res;
  });
};

export const deleteCategoryFromBusiness = (businessId, categoryId) => {
  const url = getApiBusinessUrlWithId(businessId);
  console.log("--------------deleteCategoryFromBusiness", businessId, categoryId);
  return del(`${url}/categories/${categoryId}`, {
    params: { businessId: businessId, categoryId: categoryId },
  }).then((res) => {
    return res;
  });
};