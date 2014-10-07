'use strict';

var User     = require('./user.model');
var passport = require('passport');
var config   = require('../../config/environment');
var jwt      = require('jsonwebtoken');
var _        = require('lodash');
var path     = require('path');
var util     = require('util');
var fs       = require('fs');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Updates a users
 * restriction: 'admin'
 */
exports.updateRaised = function(req, res, next) {
  var userId = req.body.id;
  var raised = req.body.raised;
  
  console.log("RAISED: "+raised);
  User.findById(userId, function (err, user) {
    if (err) return validationError(res, err);
    user.raised = raised;
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Updates a user profile attributes
 */
exports.profile = function(req, res) {
  var city  = String(req.body.city);
  var state = String(req.body.state);
  var bio   = String(req.body.bio);
    
  User.findById(req.user._id, function (err, user) {
    if (err) return validationError(res, err);
    user.city = city.substring(0,30);
    user.state = state.substring(0,2);
    user.bio = bio.substring(0, 2000);
    
    user.save(function(err){
      if (err) return validationError(res, err);
      res.send(200); 
    });
  });
};

exports.upload = function(req, res, next) {
  
  console.log(util.inspect(req.files.file, {depth: 2, colors: true}));
  var data = _.pick(req.body, 'type'),
      uploadPath = path.normalize('./client/assets/images/growers'),
      file = req.files.file;
      
  User.findById(req.user._id, function(err, user) {
    if (err) return validationError(res, err);
    
    var extension = file.path.split('.').pop();
    
    console.log("Extension: " + extension);
    console.log("Location:  " + './client/assets/images/growers/'+user._id+'.'+extension);
    fs.rename(file.path, './client/assets/images/growers/'+user._id+'.'+extension, function(err){
      if (err) return res.send(500, err);
      console.log("Move Complete");
    });
    
    user.picture = user._id + '.' + extension;
    user.save(function(err){
      if (err) return validationError(res, err);
      res.send(200, { picture: user.picture });
    })
  });
  
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
