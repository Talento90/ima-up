import Joi from 'joi'

export default (server) => {
  server.route({
    method: 'POST',
    path: '/api/images',
    config: {
      tags: ['api'],
      description: 'Upload image.',
      validate: {
        params: {
          yourname: Joi.string().max(40).min(2).alphanum()
        }
      },
      handler: (req, reply) => {
        reply('Hello ' + req.params.yourname + '!')
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/api/images/{id}',
    config: {
      tags: ['api'],
      description: 'Get image by id.',
      validate: {
        params: {
          id: Joi.string().max(40).min(2)
        }
      },
      handler: (req, reply) => {
        reply('Hello ' + req.params.yourname + '!')
      }
    }
  })
}
