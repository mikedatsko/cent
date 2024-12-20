import { debug } from 'torque';

async function publicCategoriesAdd(req, res, next) {
  try {
    const db = req.app.get('DB');
    const { id } = req.params;
    const { errorName } = req.query;

    debug('id', id);
    debug('errorName', errorName);

    const category = id
      ? await db.getOne('category', id)
      : await Promise.resolve();

    // const config = await db.get('config');
    // const posts = await db.get('post');
    // debug('posts', posts);
    // debug('config', config);

    // const title = config.find(setting => setting.id === 'title');

    debug('category', category);

    res.render('publicCategoriesAdd', {
      title: 'CENT',
      errorName: errorName || '',
      id: id || '',
      name: (category && category.name) || ''
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

export default publicCategoriesAdd;
