import debugSetup from 'debug';

const debug = debugSetup('app/src/modules/sources/routes/public/index');

async function publicGetSources(req, res, next) {
  try {
    const db = req.app.get('DB');
    const config = await db.get('config');
    const sources = await db.get('source');
    debug('sources', sources);
    debug('config', config);

    const title = config.find(setting => setting.id === 'title');

    res.render('public-sources', {
      title: (title && title.value) || '',
      sources: sources.map((source, index) => ({
        num: index + 1,
        id: source.id,
        title: source.title,
        intro: source.intro,
        image: source.image,
        content: source.content,
        created: source.created,
        modified: source.modified
      }))
    });
  } catch (err) {
    res.render('error', { error: err });
  }
}

export default publicGetSources;
