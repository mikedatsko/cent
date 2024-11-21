import debugSetup from 'debug';

const debug = debugSetup('app/src/modules/sources/routes/admin/sources');

async function sources(req, res, next) {
  try {
    debug('get sources', req.app.get('views'));

    const db = req.app.get('DB');
    const sources = await db.get('source');
    debug('sources', sources.length);
    const files = await db.get('file');
    debug('files', files.length);

    res.render('admin-sources', {
      layout: 'layout-admin',
      sources: sources.map((source, index) => ({
        num: index + 1,
        id: source.id,
        title: source.title,
        intro: source.intro,
        image: source.image,
        imageTitle: source.image
          ? files.find(file => file.id === source.image).title
          : '',
        isFeatured: !!source.isFeatured,
        isPublished: !!source.isPublished,
        content: source.content,
        created: source.created,
        modified: source.modified
      }))
    });
  } catch (err) {
    debug(err);
    res.render('error', { message: err.message, error: err });
  }
}

export default sources;
