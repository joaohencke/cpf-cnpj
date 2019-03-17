const express = require('express');
const next = require('next');
const config = require('./server/__config');
const routes = require('./routes');

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = routes.getRequestHandler(app);

(async () => {
  await app.prepare();

  const server = express();
  config(server);

  server.get('*', handle);

  server.listen(port, err => {
    if (err) throw err;

    console.info(`express listening on port ${port}`);
  });
})();
