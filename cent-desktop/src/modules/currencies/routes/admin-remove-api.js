import debugSetup from 'debug';
import moduleConfig from '../module-config.js';

const debug = debugSetup(
  `app/src/modules/${moduleConfig.codeMany}/routes/admin/remove-api`
);

async function adminRemoveApi(req, res, next) {
  try {
    const db = req.app.get('DB');
    const { id } = req.params;
    debug('remove', id);

    if (id) {
      await db.removeOne(moduleConfig.code, id);
    }

    res.redirect(`/admin/${moduleConfig.codeMany}`);
  } catch (err) {
    debug(err);
    res.render('error', { message: err.message, error: err });
  }
}

export default adminRemoveApi;
