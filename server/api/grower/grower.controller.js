'use strict';

var User = require('../user/user.model');
var config = require('../../config/environment');

// List of fields we only wanted selected when fetching a user
var fieldsList = 'name city state bio picture raised';

/**
 * Get list of growers
 */
exports.index = function(req, res) {
  User.find({role: 'user'}, fieldsList, function( err, users ) {
    if(err) return hangleError(res, err);
    return res.json(200, users);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}