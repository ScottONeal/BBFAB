'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var multipart = require('connect-multiparty');

var router = express.Router();

var multipartMiddleware = multipart();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.post('/:id/raised', auth.isAuthenticated(), controller.updateRaised);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/:id/upload', auth.isAuthenticated(), multipartMiddleware, controller.upload);
router.post('/:id/profile', auth.isAuthenticated(), controller.profile);
router.post('/', controller.create);

module.exports = router;
