import debugSetup from 'debug';
import moduleConfig from '../module-config.js';

const debug = debugSetup(
  `app/src/modules/${moduleConfig.codeMany}/routes/admin/list`
);

async function adminGetList(req, res, next) {
  try {
    debug('get', req.app.get('views'));

    const db = req.app.get('DB');
    const modules = req.app.get('MODULES');
    const list = await db.get(moduleConfig.code);
    debug('list', list.length);
    debug('modules', modules.length);

    res.render(`admin-${moduleConfig.codeMany}`, {
      layout: 'layout-admin',
      modules,
      [moduleConfig.codeMany]: list.map((item, index) => ({
        ...item,
        num: index + 1
      }))
    });
  } catch (err) {
    debug(err);
    res.render('error', { message: err.message, error: err });
  }
}

export default adminGetList;
