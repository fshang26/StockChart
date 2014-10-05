var path = require('path'),
rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
      db: 'mongodb://localhost/spaboilerplate',
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  production: {
    db: 'mongodb://fshang:e42jmvml@ds041140.mongolab.com:41140/spaboilerplate',
    rootPath: rootPath,
    port: process.env.PORT || 80
  }
}