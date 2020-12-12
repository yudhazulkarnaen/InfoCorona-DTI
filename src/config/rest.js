export default {
  LOGIN: '/api/login',
  PRODUCT: '/api/product',
  REGISTER: 'auth/register',
  USERBYID: (userId) => {
    return `users/${userId}`;
  },
};
