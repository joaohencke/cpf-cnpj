const express = require('express');
const next = require('next');
const config = require('./server/__config');
const Boom = require('boom');

const port = process.env.NODE_ENV || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

(async () => {

  await app.prepare();

  const server = express();
  config(server);


  server.get('*', (req, res) => {
    console.log('handle')
    return handle(req, res)
  });

  server.use((err, req, res) => {
    let error = Boom.isBoom(err) ? err : Boom.boomify(err);
    if (error.name === 'ValidationError') {
      error = Boom.boomify(error, {
        statusCode: 400,
      });
    }
    if (process.env.NODE_ENV !== 'test') console.trace(error);
    return res.status(error.output.statusCode).json({
      error: error.output.payload.error,
      message: error.message,
    })
      .setHeader('content-type', 'text/json');
  });



  server.listen(port, err => {
    if (err) throw err;

    console.info(`express listening on port ${port}`);
  });
})();

