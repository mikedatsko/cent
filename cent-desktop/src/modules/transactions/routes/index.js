import adminAddPost from './admin-add.js';
import adminAddPostApi from './admin-add-api.js';
import adminGetPosts from './admin-get-posts.js';
import adminRemoveApi from './admin-remove-api.js';
import publicGetPosts from './public-get-posts.js';

export default [
  {
    method: 'get',
    path: '/admin/posts/add',
    isPrivate: true,
    callback: adminAddPost
  },
  {
    method: 'get',
    path: '/admin/posts/add/:postId',
    isPrivate: true,
    callback: adminAddPost
  },
  {
    method: 'get',
    path: '/admin/posts/remove/:postId',
    isPrivate: true,
    callback: adminRemoveApi
  },
  {
    method: 'get',
    path: '/admin/posts',
    isPrivate: true,
    callback: adminGetPosts
  },
  {
    method: 'post',
    path: '/admin/posts/add',
    isPrivate: true,
    callback: adminAddPostApi
  },
  {
    method: 'get',
    path: '/p',
    isPrivate: false,
    callback: publicGetPosts
  }
];
