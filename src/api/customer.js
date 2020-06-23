import { get }  from './axios';
const API_CUSTOMER_URL = '/customers'

export const fetchCustomers = () => {
  return get(API_CUSTOMER_URL).then(res => {
    return res.data;
  })
}