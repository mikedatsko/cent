import publicHome from './publicHome.js';
import adminHome from './adminHome.js';
import adminApi from './adminApi.js';

export default [
  {
    method: 'get',
    path: '/',
    isPrivate: false,
    callback: publicHome
  },
  {
    method: 'get',
    path: '/admin',
    isPrivate: true,
    callback: adminHome
  },
  {
    method: 'get',
    path: '/admin/api',
    isPrivate: true,
    callback: adminApi
  }
];
