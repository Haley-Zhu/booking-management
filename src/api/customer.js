import { get, post, del }  from './axios';
// import axios from 'axios';
const API_CUSTOMER_URL = '/customers'
const getApiCustomerUrlWithId = id => `${API_CUSTOMER_URL}/${id}`;

export const fetchCustomers = () => {
  return get(API_CUSTOMER_URL).then(res => {
    return res.data;
  })
}

export const createCustomer = (customer) => {
  return post(API_CUSTOMER_URL, customer).then(res => {
    console.log('post valuse customer', customer);
    console.log('post valuse feedback', res.data);
    return res;
  });
}

export const deleteCustomerById = (id) => {
  const url = getApiCustomerUrlWithId(id);
  return del(url).then(res => {
    console.log('post valuse deleteCustomerById feedback', res.data);
    return res;
  });
}