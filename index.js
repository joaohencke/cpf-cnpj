const express = require('express');
const next = require('next');
const config = require('./server/__config');
const port = process.env.NODE_ENV || 3000;

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

(async () => {

  await app.prepare();

  const server = express();
  config(server);

  server.get('*', (req, res) => {
    return handle(req, res)
  });

  server.listen(port, err => {
    if (err) throw err;

    console.info(`express listening on port ${port}`);
  });
})();

