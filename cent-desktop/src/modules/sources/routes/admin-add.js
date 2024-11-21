import debugSetup from 'debug';

const debug = debugSetup('app/src/modules/sources/routes/admin/add');

async function add(req, res, next) {
  try {
    const db = req.app.get('DB');
    const { sourceId } = req.params;
    let source;
    debug('add sourceId', sourceId);

    if (sourceId) {
      source = await db.getOne('sourceId', sourceId);
    }

    debug('source', source);

    res.render('admin-source-add', {
      layout: 'layout-admin',
      source: source
    });
  } catch (err) {
    debug(err);
    res.render('error', { message: err.message, error: err });
  }
}

export default add;
