import debugSetup from 'debug';

const debug = debugSetup('app/src/modules/posts/routes/admin/posts');

async function posts(req, res, next) {
  try {
    debug('get posts', req.app.get('views'));

    const db = req.app.get('DB');
    const posts = await db.get('post');
    debug('posts', posts.length);
    const files = await db.get('file');
    debug('files', files.length);

    res.render('admin-posts', {
      layout: 'layout-admin',
      posts: posts.map((post, index) => ({
        num: index + 1,
        id: post.id,
        title: post.title,
        intro: post.intro,
        image: post.image,
        imageTitle: post.image
          ? files.find(file => file.id === post.image).title
          : '',
        isFeatured: !!post.isFeatured,
        isPublished: !!post.isPublished,
        content: post.content,
        created: post.created,
        modified: post.modified
      }))
    });
  } catch (err) {
    debug(err);
    res.render('error', { message: err.message, error: err });
  }
}

export default posts;
