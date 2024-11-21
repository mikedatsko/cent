import debugSetup from 'debug';

const debug = debugSetup('app/src/modules/posts/routes/admin/add');

async function add(req, res, next) {
  try {
    const db = req.app.get('DB');
    const { postId } = req.params;
    let post;
    debug('add post', postId);

    if (postId) {
      post = await db.getOne('post', postId);
    }

    debug('post', post);

    res.render('admin-post-add', {
      layout: 'layout-admin',
      post: post
    });
  } catch (err) {
    debug(err);
    res.render('error', { message: err.message, error: err });
  }
}

export default add;
