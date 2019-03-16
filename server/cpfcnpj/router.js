const express = require('express');

const router = express.Router({ mergeParams: true });

module.exports = router;

router.get('/', (req, res, next) => { });

router.get('/:id', (req, res, next) => { });

router.post('/', (req, res, next) => { });

router.put('/:id', (req, res, next) => { });