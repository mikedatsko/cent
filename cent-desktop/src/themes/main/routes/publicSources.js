import { debug } from 'torque';

async function publicSources(req, res, next) {
  try {
    debug('Sources', 'start');
    const db = req.app.get('DB');
    // const config = await db.get('config');
    // const posts = await db.get('post');
    // debug('posts', posts);
    // debug('config', config);

    // const title = config.find(setting => setting.id === 'title');

    res.render('publicSources', {
      title: 'CENT'
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

export default publicSources;
