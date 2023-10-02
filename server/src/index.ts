import dotEnv from 'dotenv';

dotEnv.config({
  path: '.env',
});

import App from './app';
import IndexRoute from './routes/index.router';
import AuthRoute from './routes/auth.router';
import UserRoute from './routes/user.router';
import ProductRoute from './routes/products.router';
import CategoryRoute from './routes/category.router';

const app = new App([
  new IndexRoute(),
  new AuthRoute(),
  new UserRoute(),
  new ProductRoute(),
  new CategoryRoute()
]);

app.listen();
