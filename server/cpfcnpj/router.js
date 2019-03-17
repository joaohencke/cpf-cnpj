const express = require('express');
const { validator } = require('../utils/struct');
const { handler } = require('../utils/error');

const manager = require('./');

const router = express.Router({ mergeParams: true });

module.exports = router;

router.get(
  '/',
  validator('query', {
    filter: 'string?',
    order: 'string?',
    page: 'string?',
  }),
  (req, res) => {
    manager
      .list(req.validData)
      .then(items => res.json(items))
      .catch(handler.bind(handler, res));
  },
);

router.get('/:_id', validator('params', { _id: 'string & mongoId' }), (req, res, next) => {
  manager
    .get(req.validData)
    .then(entry => res.json(entry))
    .catch(handler.bind(handler, res));
});

router.post(
  '/',
  validator('body', {
    value: 'string & cpfcnpj',
    blacklist: 'boolean',
  }),
  (req, res) => {
    manager
      .create(req.validData)
      .then(entry => res.json(entry))
      .catch(handler.bind(handler, res));
  },
);

router.put(
  '/:_id',
  validator('body', {
    _id: 'string & mongoId',
    value: 'string & cpfcnpj',
    blacklist: 'boolean',
  }),
  (req, res) => {
    manager
      .update(req.validData)
      .then(entry => res.json(entry))
      .catch(handler.bind(handler, res));
  },
);
