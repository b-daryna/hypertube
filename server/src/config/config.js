// const path = require('path')

module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'hypertube',
    user: process.env.DB_USER || 'hypertube',
    password: process.env.DB_PASS || 'hypertube',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      // storage: path.resolve(__dirname, '../../tabtracker.sqlite')
      storage: './tabtracker.sqlite'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
