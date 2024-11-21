import path from 'path';
import routes from './routes/index.js';
import db from './db.js';
import moduleConfig from './module-config.js';

const __dirname = import.meta.dirname;

const currencies = {
  name: moduleConfig.codeMany,
  type: 'module',
  routes: routes,
  db,
  views: path.join(__dirname, 'views'),
  assets: path.join(__dirname, 'assets')
};

export default currencies;
