import debugSetup from 'debug';

const debug = debugSetup('app/src/modules/posts/routes/admin/remove-api');

async function removeApi(req, res, next) {
  try {
    const db = req.app.get('DB');
    const { postId } = req.params;
    let post;
    debug('remove post', postId);

    if (postId) {
      await db.removeOne('post', postId);
    }

    res.redirect('/admin/posts');
  } catch (err) {
    debug(err);
    res.render('error', { message: err.message, error: err });
  }
}

export default removeApi;
