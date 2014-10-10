'use strict';

var User = require('../user/user.model');
var config = require('../../config/environment');

// List of fields we only wanted selected when fetching a user
var fieldsList = 'name city state bio picture raised twitter instagram';

/**
 * Get list of growers
 */
exports.index = function(req, res) {
  User.find({role: 'user'}, fieldsList, function( err, users ) {
    if(err) return handleError(res, err);
    return res.json(200, users);
  });
};

/**
 * Get a single grower from ID
 */
exports.single = function(req, res) {
  console.log("ID: "+req.param("id"));
  User.findById(req.param("id"), fieldsList, function(err, grower) {
    if (err) handleError(res, err);
    res.send(200, grower);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
