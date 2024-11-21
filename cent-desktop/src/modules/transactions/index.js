import path from 'path';
import routes from './routes/index.js';
import db from './db.js';

const __dirname = import.meta.dirname;

const posts = {
  name: 'posts',
  type: 'module',
  routes: routes,
  db,
  views: path.join(__dirname, 'views'),
  assets: path.join(__dirname, 'assets')
};

export default posts;
