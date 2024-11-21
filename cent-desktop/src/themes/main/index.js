import path from 'path';
import routes from './routes/index.js';

const __dirname = import.meta.dirname;
const mainTheme = {
  name: 'main-theme',
  type: 'theme',
  routes: {
    public: {
      path: '/',
      router: routes
    }
  },
  layouts: path.join(__dirname, 'views', 'layouts'),
  partials: path.join(__dirname, 'views', 'partials'),
  views: path.join(__dirname, 'views'),
  assets: path.join(__dirname, 'assets')
};

export default mainTheme;
