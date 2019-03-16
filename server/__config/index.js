const express = require('express');
const Boom = require('boom');
const morgan = require('morgan');
const db = require('./db');

module.exports = app => {
  app.use(
    express.json()
  );
  app.use(
    morgan('dev')
  );

  db();

  const apis = require('../_apis');

  Object.keys(apis).forEach(path => {
    app.use(`/api/${path}`, apis[path]);
  });

  //error handler
  app.use((err, req, res) => {
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
    });
  });
};