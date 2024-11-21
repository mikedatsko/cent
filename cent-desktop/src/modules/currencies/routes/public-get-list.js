import debugSetup from 'debug';
import moduleConfig from '../module-config.js';

const debug = debugSetup(
  `app/src/modules/${moduleConfig.codeMany}/routes/public/list`
);

async function publicGetSources(req, res, next) {
  try {
    const db = req.app.get('DB');
    const config = await db.get('config');
    const list = await db.get(moduleConfig.code);
    debug('list', list);
    debug('config', config);

    const title = config.find(setting => setting.id === 'title');

    res.render(`public-${moduleConfig.codeMany}`, {
      title: (title && title.value) || '',
      [moduleConfig.codeMany]: list.map((item, index) => ({
        ...item,
        num: index + 1
      })),
      moduleConfig
    });
  } catch (err) {
    res.render('error', { error: err });
  }
}

export default publicGetSources;
