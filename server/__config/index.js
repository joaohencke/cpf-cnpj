const express = require('express');
const morgan = require('morgan');
const db = require('./db');

module.exports = app => {
  app.use(
    express.json({
      limit: '50mb',
      type: 'application/json',
    }),
  );
  app.use(morgan('dev'));

  db();

  const apis = require('../_apis'); //eslint-disable-line

  Object.keys(apis).forEach(path => {
    app.use(`/api/${path}`, apis[path]);
  });
};
