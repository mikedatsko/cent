import debugSetup from 'debug';
import moduleConfig from '../module-config.js';

const debug = debugSetup(
  `app/src/modules/${moduleConfig.codeMany}/routes/admin/add`
);

async function adminAdd(req, res, next) {
  try {
    const db = req.app.get('DB');
    const { id } = req.params;
    let item;
    debug('add id', id);

    if (id) {
      item = await db.getOne('id', id);
    }

    debug('item', item);

    res.render(`admin-${moduleConfig.code}-add`, {
      layout: 'layout-admin',
      [moduleConfig.code]: item
    });
  } catch (err) {
    debug(err);
    res.render('error', { message: err.message, error: err });
  }
}

export default adminAdd;
