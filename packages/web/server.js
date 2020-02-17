const { createServer } = require('http');

const next = require('next');
const router = require('next-routes');

const routes = router()
  .add('/', 'auth')
  .add('/home', 'home')
  .add('/discover/:tab', 'discover')
  .add('/discover', 'discover')
  .add('/discover', 'discover')
  .add('/activity', 'activity')
  .add('/profile', 'profile')
  .add('/profile/:tab', 'profile');

const app = next({
  dev: process.env.NODE_ENV !== 'production',
});

const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  createServer(handler).listen(3000);
});
