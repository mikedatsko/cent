import debugSetup from 'debug';

const debug = debugSetup('app/src/modules/sources/routes/public/add');

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

    res.render('public-source-add', {
      layout: 'layout-base',
      source: source
    });
  } catch (err) {
    debug(err);
    res.render('error', { message: err.message, error: err });
  }
}

export default add;
