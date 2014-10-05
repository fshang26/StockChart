var mongoose = require('mongoose'),
    itemSchema = mongoose.Schema({
      title: {type:String, required:'{PATH} is required!'},
      featured: {type:Boolean, required:'{PATH} is required!'},
      published: {type:Date, required:'{PATH} is required!'},
      tags: [String]
    }),
    Item = mongoose.model('Item', itemSchema);

function createDefaultItems() {
  Item.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      Item.create({title: 'Item 1', featured: true, published: new Date('10/5/2014'), tags: ['Tag 1']});
      Item.create({title: 'Item 2', featured: true, published: new Date('10/12/2014'), tags: ['Tag 1']});
      Item.create({title: 'Item 3', featured: false, published: new Date('10/1/2014'), tags: ['Tag 1']});
      Item.create({title: 'Item 4', featured: false, published: new Date('7/12/2014'), tags: ['Tag 2']});
      Item.create({title: 'Item 5', featured: true, published: new Date('1/1/2014'), tags: ['Tag 3']});
      Item.create({title: 'Item 6', featured: true, published: new Date('10/13/2014'), tags: ['Tag 4']});
      Item.create({title: 'Item 7', featured: true, published: new Date('3/1/2014'), tags: ['Tag 5']});
      Item.create({title: 'Item 8', featured: true, published: new Date('2/1/2014'), tags: ['Tag 5']});
      Item.create({title: 'Item 9', featured: true, published: new Date('10/7/2014'), tags: ['Tag 6']});
      Item.create({title: 'Item 10', featured: false, published: new Date('8/1/2014'), tags: ['Tag 7']});
      Item.create({title: 'Item 11', featured: false, published: new Date('11/1/2014'), tags: ['Tag 6']});
      Item.create({title: 'Item 12', featured: true, published: new Date('10/13/2014'), tags: ['Tag 5']});
      Item.create({title: 'Item 13', featured: false, published: new Date('10/1/2014'), tags: ['Tag 5']});
      Item.create({title: 'Item 14', featured: true, published: new Date('2/15/2014'), tags: ['Tag 6']});
      Item.create({title: 'Item 15', featured: true, published: new Date('7/1/2014'), tags: ['Tag 5', 'Tag 6']});
    }
  })
}

exports.createDefaultItems = createDefaultItems;