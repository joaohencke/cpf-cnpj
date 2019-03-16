const express = require('express');

module.exports = app => {
  app.use(
    express.json()
  );

  const apis = require('../_apis');

  Object.keys(apis).forEach(path => {
    app.use(`/api/${path}`, apis[path]);
  });
};