const express = require('express');
const { validator } = require('../utils/struct');

const manager = require('./');

const router = express.Router({ mergeParams: true });

module.exports = router;

router.get('/', (req, res, next) => { });

router.get('/:_id',
  validator('params', { _id: 'string & mongoId' }),
  (req, res, next) => {
    manager.get(req.validData)
      .then(entry => res.json(entry))
      .catch(next);
  });

router.post('/',
  validator('body', {
    value: 'string & cpfcnpj',
    blacklist: 'boolean'
  }),
  (req, res, next) => {
    manager.create(req.validData)
      .then(entry => res.json(entry))
      .catch(next);
  });

router.put('/:id',
  validator('body', {
    _id: 'string & mongoId',
    value: 'string & cpfcnpj',
    blacklist: 'boolean'
  }),
  (req, res, next) => {
    manager.update(req.validData)
      .then(entry => res.json(entry))
      .catch(next);
  });