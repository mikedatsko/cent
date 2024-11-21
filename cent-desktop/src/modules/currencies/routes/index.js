import adminAdd from './admin-add.js';
import adminAddApi from './admin-add-api.js';
import adminGetList from './admin-get-list.js';
import adminRemoveApi from './admin-remove-api.js';
import publicGetList from './public-get-list.js';
import publicAdd from './public-add.js';
import moduleConfig from '../module-config.js';

export default [
  {
    method: 'get',
    path: `/admin/${moduleConfig.codeMany}/add`,
    isPrivate: true,
    callback: adminAdd
  },
  {
    method: 'get',
    path: `/admin/${moduleConfig.codeMany}/add/:id`,
    isPrivate: true,
    callback: adminAdd
  },
  {
    method: 'get',
    path: `/admin/${moduleConfig.codeMany}/remove/:id`,
    isPrivate: true,
    callback: adminRemoveApi
  },
  {
    method: 'get',
    path: `/admin/${moduleConfig.codeMany}`,
    isPrivate: true,
    callback: adminGetList
  },
  {
    method: 'post',
    path: `/admin/${moduleConfig.codeMany}/add`,
    isPrivate: true,
    callback: adminAddApi
  },
  {
    method: 'get',
    path: `/${moduleConfig.codeMany}`,
    isPrivate: false,
    callback: publicGetList
  },
  {
    method: 'get',
    path: `/${moduleConfig.codeMany}/add`,
    isPrivate: false,
    callback: publicAdd
  }
];
