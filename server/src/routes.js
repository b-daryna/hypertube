const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationPolicy = require('./policies/AuthenticationPolicy')
const StreamingController = require('./controllers/StreamingController')

// express Middleware
module.exports = (app) => {
  app.post('/register', AuthenticationPolicy.register, AuthenticationController.register)
  app.post('/login', AuthenticationController.login)
  app.get('/stream',StreamingController.encodeParams,StreamingController.stream)
}
