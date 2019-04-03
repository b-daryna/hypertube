const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{6,32}$')
      ),
      login: Joi.string().regex(
        new RegExp('^(?=.{8,20}$)(?![_.])[a-zA-Z0-9._]+(?<![_.])$')
      ),
      name: Joi.string().regex(
        new RegExp('^[a-zA-Z]{2,32}$')
      ),
      lastName: Joi.string().regex(
        new RegExp('^[a-zA-Z]{2,32}$')
      )
    }

    const { error } = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: 'Your password must be from 6 to 32 characters long, ' +
            'and contain lower and uppercase characters or numbers'
          })
          break
        case 'login':
          res.status(400).send({
            error: 'Your login should be 8-20 characters long and should not start or end with a _'
          })
          break
        case 'name':
          res.status(400).send({
            error: 'Your name should be less than 32 symbols and contain only characters'
          })
          break
        case 'lastName':
          res.status(400).send({
            error: 'Your Last Name should be less than 32 symbols and contain only characters'
          })
          break
        default:
          console.log('error', error)
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      next()
    }
  }
}
