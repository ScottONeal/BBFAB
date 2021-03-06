'use strict';

var express = require('express');
var controller = require('./grower.controller');
var config = require('../../config/environment');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.single);

module.exports = router;