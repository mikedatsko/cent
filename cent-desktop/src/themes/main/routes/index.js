import publicHome from './publicHome.js';
import publicTransactions from './publicHome.js';
import publicCategories from './publicCategories.js';
import publicCategoriesAdd from './publicCategoriesAdd.js';
import publicCategoriesAddSubmit from './publicCategoriesAddSubmit.js';
import publicCategoriesDelete from './publicCategoriesDelete.js';
import publicSources from './publicSources.js';
import publicSourcesAdd from './publicSourcesAdd.js';
import publicSourcesAddSubmit from './publicSourcesAddSubmit.js';
import publicCurrencies from './publicCurrencies.js';
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
    path: '/transactions',
    isPrivate: false,
    callback: publicTransactions
  },
  {
    method: 'get',
    path: '/categories',
    isPrivate: false,
    callback: publicCategories
  },
  {
    method: 'get',
    path: '/categories/add',
    isPrivate: false,
    callback: publicCategoriesAdd
  },
  {
    method: 'get',
    path: '/categories/add/:id',
    isPrivate: false,
    callback: publicCategoriesAdd
  },
  {
    method: 'post',
    path: '/categories/add',
    isPrivate: false,
    callback: publicCategoriesAddSubmit
  },
  {
    method: 'get',
    path: '/categories/delete/:id',
    isPrivate: false,
    callback: publicCategoriesDelete
  },
  {
    method: 'get',
    path: '/sources',
    isPrivate: false,
    callback: publicSources
  },
  {
    method: 'get',
    path: '/sources/add',
    isPrivate: false,
    callback: publicSourcesAdd
  },
  {
    method: 'post',
    path: '/sources/add',
    isPrivate: false,
    callback: publicSourcesAddSubmit
  },
  {
    method: 'get',
    path: '/currencies',
    isPrivate: false,
    callback: publicCurrencies
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
