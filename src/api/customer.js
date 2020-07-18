import { get, post, del, put }  from './axios';
import { SEARCH_ALL } from '../utils/constants';
// import axios from 'axios';
const API_CUSTOMER_URL = '/customers'
const getApiCustomerUrlWithId = id => `${API_CUSTOMER_URL}/${id}`;

export const fetchCustomerById = (id) => {
  console.log("--------------fetchCustomerById: ", id);
  const url = getApiCustomerUrlWithId(id);
  return get(url).then((res) => {
    console.log("--------------fetchCustomerById: res.data", res.data);
    return res.data;
  });
};

export const fetchCustomers = () => {
  console.log('--------------fetchCustomers');
  return get(API_CUSTOMER_URL).then(res => {
    return res.data;
  })
}

export function fetchCustomersByFliter(searchCondition = { searchField: {SEARCH_ALL} }) {
  const { searchValue, searchField } = searchCondition;
  console.log('--------------fetchCustomersByFliter', searchValue, searchField);
  return get(API_CUSTOMER_URL, { params: {searchValue, searchField}}).then(res => {
    console.log('--------------fetchCustomersByFliter, res.data:', res.data);
    return res.data;
  })
}

export const createCustomer = (customer) => {
  console.log('--------------createCustomer');
  return post(API_CUSTOMER_URL, customer).then(res => {
    return res;
  });
}

export const updateCustomer = (id, customer) => {
  console.log('--------------updateCustomer', id, customer);
  return put(`${API_CUSTOMER_URL}/${id}`, customer).then(res => {
    return res;
  });
}

export const deleteCustomerById = (id) => {
  const url = getApiCustomerUrlWithId(id);
  return del(url).then(res => {
    return res;
  });
}