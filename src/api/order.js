import { get, post, del, put }  from './axios';
import { SEARCH_ALL } from '../utils/constants';
// import axios from 'axios';
const API_ORDER_URL = '/orders'
const getApiOrderUrlWithId = id => `${API_ORDER_URL}/${id}`;

export const fetchOrders = () => {
  console.log('--------------fetchOrders');
  return get(API_ORDER_URL).then(res => {
    return res.data;
  })
}

export function fetchOrdersByFliter(searchCondition = { searchField: {SEARCH_ALL} }) {
  const { searchValue, searchField } = searchCondition;
  console.log('--------------fetchOrdersByFliter', searchValue, searchField);
  return get(API_ORDER_URL, { params: {searchValue, searchField}}).then(res => {
    console.log('--------------fetchOrdersByFliter, res.data:', res.data);
    return res.data;
  })
}

export const createOrder = (order) => {
  console.log('--------------createOrder', order);
  return post(API_ORDER_URL, order).then(res => {
    return res;
  });
}

export const updateOrder = (id, order) => {
  console.log('--------------updateOrder', id, order);
  return put(`${API_ORDER_URL}/${id}`, order).then(res => {
    return res;
  });
}

export const deleteOrderById = (id) => {
  const url = getApiOrderUrlWithId(id);
  console.log('--------------deleteOrderById', id, url);
  return del(url).then(res => {
    return res;
  });
}