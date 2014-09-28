var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    stylus = require('stylus'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
  return stylus(str).set('filename', path);
};

//app.configure(function() {
  app.set('views', __dirname + '/server/views');
  app.set('view engine', 'jade');
  app.use(morgan('dev'));
  app.use(bodyParser());
  app.use(stylus.middleware({
    src: __dirname + '/pubic',
    compile: compile
  }));
  app.use(express.static(__dirname + '/public'));
//});

if (env === 'development') {
  mongoose.connect('mongodb://localhost/spaboilerplate');
} else {
  mongoose.connect('mongodb://fshang:e42jmvml@ds041140.mongolab.com:41140/spaboilerplate');
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
  console.log('spaboilerplate db opened');
});
var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.find().exec(function(err, messageDoc) {
  mongoMessage = messageDoc[0].message;
});


app.get('/partials/:partialPath', function(req, res) {
  res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res) {
  res.render('index', {
    mongoMessage: mongoMessage
  });
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');