var mongoose = require('mongoose');
var crypto = require('crypto');


module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('spaboilerplate db opened');
  });

  var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    emailID: String,
    salt: String,
    hashed_pwd: String,
    roles: [String]
  });
  userSchema.methods = {
    authenticate: function(passwordToMatch) {
      return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
  };

  var User = mongoose.model('User', userSchema);

  User.find({}).exec(function(err, collection) {
    if (collection.length === 0) {
      var salt, hash;
      salt = createSalt();
      hash = hashPwd(salt, 'abc123');
      User.create({firstName: 'Feng', lastName: 'Shang', emailID: 'feng.shang@outlook.com', salt: salt, hashed_pwd: hash, roles: ['admin']});
      salt = createSalt();
      hash = hashPwd(salt, 'abc123');
      User.create({firstName: 'Hong', lastName: 'Shang', emailID: 'bigapple26@outlook.com', salt: salt, hashed_pwd: hash, roles: []});
      salt = createSalt();
      hash = hashPwd(salt, 'abc123');
      User.create({firstName: 'Bing', lastName: 'Shang', emailID: 'fshang@msn.com', salt: salt, hashed_pwd: hash});
    }
  })
}

function createSalt() {
  return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
  var hmac = crypto.createHmac('sha1', salt);
  return hmac.update(pwd).digest('hex');
}
