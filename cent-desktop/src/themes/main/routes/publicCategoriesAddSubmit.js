import { debug, uuid } from 'torque';

async function publicCategoriesAddSubmit(req, res, next) {
  try {
    const { id, name } = req.body;

    debug('id', id, 'name', name);

    if (!name) {
      res.redirect(
        '/categories/add' + (id ? `/${id}` : '') + '?errorName=Empty name field'
      );
      return;
    }

    const db = req.app.get('DB');
    const created = new Date();

    if (id) {
      await db.updateOne('category', id, { name });
    } else {
      await db.addOne('category', {
        id: uuid(),
        name,
        created,
        modified: created
      });
    }
    // const config = await db.get('config');
    // const posts = await db.get('post');
    // debug('posts', posts);
    // debug('config', config);

    // const title = config.find(setting => setting.id === 'title');

    res.redirect('/categories');
  } catch (err) {
    res.render('error', { error: err });
  }
}

export default publicCategoriesAddSubmit;
