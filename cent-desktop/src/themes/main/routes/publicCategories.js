import { debug } from 'torque';

async function publicCategories(req, res, next) {
  try {
    const { success, error, message } = req.query;
    const db = req.app.get('DB');
    const categories = await db.get('category');
    debug('categories', categories);
    // const posts = await db.get('post');
    // debug('posts', posts);
    // debug('config', config);

    // const title = config.find(setting => setting.id === 'title');

    res.render('publicCategories', {
      title: 'CENT',
      categories,
      success: success || '',
      error: error || '',
      message: message || ''
      // posts: posts.map((post, index) => ({
      //   num: index + 1,
      //   id: post.id,
      //   title: post.title,
      //   intro: post.intro,
      //   image: post.image,
      //   content: markdown(post.content),
      //   created: post.created,
      //   modified: post.modified
      // }))
    });
  } catch (err) {
    res.render('error', { error: err });
  }
}

export default publicCategories;
