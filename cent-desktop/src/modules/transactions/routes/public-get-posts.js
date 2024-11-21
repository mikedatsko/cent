import debugSetup from 'debug';

const debug = debugSetup('app/src/modules/posts/routes/public/index');

async function getPosts(req, res, next) {
  try {
    const db = req.app.get('DB');
    const config = await db.get('config');
    const posts = await db.get('post');
    debug('posts', posts);
    debug('config', config);

    const title = config.find(setting => setting.id === 'title');

    res.render('main-index', {
      title: (title && title.value) || '',
      posts: posts.map((post, index) => ({
        num: index + 1,
        id: post.id,
        title: post.title,
        intro: post.intro,
        image: post.image,
        content: post.content,
        created: post.created,
        modified: post.modified
      }))
    });
  } catch (err) {
    res.render('error', { error: err });
  }
}

export default getPosts;
