import adminAddSource from './admin-add.js';
import adminAddSourceApi from './admin-add-api.js';
import adminGetSources from './admin-get-sources.js';
import adminRemoveApi from './admin-remove-api.js';
import publicGetSources from './public-get-sources.js';
import publicAddSource from './public-add-source.js';

export default [
  {
    method: 'get',
    path: '/admin/sources/add',
    isPrivate: true,
    callback: adminAddSource
  },
  {
    method: 'get',
    path: '/admin/sources/add/:sourceId',
    isPrivate: true,
    callback: adminAddSource
  },
  {
    method: 'get',
    path: '/admin/sources/remove/:sourceId',
    isPrivate: true,
    callback: adminRemoveApi
  },
  {
    method: 'get',
    path: '/admin/sources',
    isPrivate: true,
    callback: adminGetSources
  },
  {
    method: 'post',
    path: '/admin/sources/add',
    isPrivate: true,
    callback: adminAddSourceApi
  },
  {
    method: 'get',
    path: '/sources',
    isPrivate: false,
    callback: publicGetSources
  },
  {
    method: 'get',
    path: '/sources/add',
    isPrivate: false,
    callback: publicAddSource
  }
];
