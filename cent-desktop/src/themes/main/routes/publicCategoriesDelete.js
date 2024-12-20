import { debug } from 'torque';

async function publicCategoriesDelete(req, res, next) {
  try {
    const db = req.app.get('DB');
    const { id } = req.params;

    debug('id', id);

    if (!id) {
      res.redirect('/categories?error=Can not delete, no ID provided');
      return;
    }

    const category = await db.getOne('category', id);
    await db.removeOne('category', id);

    debug('category', category);

    // const config = await db.get('config');
    // const posts = await db.get('post');
    // debug('posts', posts);
    // debug('config', config);

    // const title = config.find(setting => setting.id === 'title');

    res.redirect(
      `/categories?success=Category ${category.name} deleted successfully`
    );
  } catch (err) {
    res.render('error', { error: err });
  }
}

export default publicCategoriesDelete;
