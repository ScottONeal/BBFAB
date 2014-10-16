/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: "Scott O'Neal",
    city: "Bowie",
    state: "MD",
    email: 'scott@scott.com',
    password: 'pass',
    raised: 35
  }, {
    provider: 'local',
    name: 'Tim Barker',
    city: "Grand Rapids",
    state: "MI",
    email: 'tim@tim.com',
    password: 'pass',
    raised: 50
  }, {
    provider: 'local',
    name: 'Matt Norris',
    city: "Bowie",
    state: "MD",
    email: 'matt@matt.com',
    password: 'pass',
    raised: 45
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});
