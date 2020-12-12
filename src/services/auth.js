import BaseService from './baseService';
import API from '../config/rest';

const login = (username, password) => {
  return BaseService.post(API.LOGIN, { username, password });
};

const getProduct = (keyword, limit, offset) => {
  return BaseService.get(API.PRODUCT, {
    params: {
      limit,
      offset,
      search: keyword,
    },
  });
};

export default { login, getProduct };
