var Item = require('mongoose').model('Item');

exports.getItems = function(req, res) {
  Item.find({}).exec(function(err, collection) {
    res.send(collection);
  })
};

exports.getItemById = function(req, res) {
  Item.findOne({_id:req.params.id}).exec(function(err, item) {
    res.send(item);
  })
};
