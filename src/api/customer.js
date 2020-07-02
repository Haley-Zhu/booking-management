import { get, post, del, put }  from './axios';
// import axios from 'axios';
const API_CUSTOMER_URL = '/customers'
const getApiCustomerUrlWithId = id => `${API_CUSTOMER_URL}/${id}`;

export const fetchCustomers = () => {
  console.log('--------------fetchCustomers');
  return get(API_CUSTOMER_URL).then(res => {
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