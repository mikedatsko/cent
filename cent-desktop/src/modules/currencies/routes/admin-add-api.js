import debugSetup from 'debug';
import { uuid, forms } from 'torque';
import moduleConfig from '../module-config.js';

const debug = debugSetup(
  `app/src/modules/${moduleConfig.codeMany}/routes/admin/add-api`
);

async function adminAddApi(req, res, next) {
  try {
    const db = req.app.get('DB');
    const itemFields = {};
    const { fields, files, fieldsSingle } = await forms.parseForm(req);
    const { id } = fieldsSingle;
    moduleConfig.fields.forEach(field => {
      itemFields[field.name] = fieldsSingle[field.name];
    });
    const dateNow = new Date().toISOString();

    debug('fields', fields);
    debug('files', files);

    if (id) {
      await db.updateOne(moduleConfig.code, id, {
        ...itemFields,
        modified: dateNow
      });
    } else {
      await db.addOne(moduleConfig.code, {
        id: uuid(),
        ...itemFields,
        created: dateNow,
        modified: dateNow
      });
    }

    res.redirect(`/admin/${moduleConfig.code}`);
  } catch (err) {
    debug(err);
    res.render('error', { message: err.message, error: err });
  }
}

export default adminAddApi;
