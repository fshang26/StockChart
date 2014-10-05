var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    itemModel = require('../models/Item');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('spaboilerplate db opened');
  });

  userModel.createDefaultUsers();
  itemModel.createDefaultItems();
};
