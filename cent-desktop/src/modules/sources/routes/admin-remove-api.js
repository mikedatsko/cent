import debugSetup from 'debug';

const debug = debugSetup('app/src/modules/sources/routes/admin/remove-api');

async function removeApi(req, res, next) {
  try {
    const db = req.app.get('DB');
    const { sourceId } = req.params;
    let source;
    debug('remove source', sourceId);

    if (sourceId) {
      await db.removeOne('source', sourceId);
    }

    res.redirect('/admin/sources');
  } catch (err) {
    debug(err);
    res.render('error', { message: err.message, error: err });
  }
}

export default removeApi;
