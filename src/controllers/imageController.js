import Joi from 'joi'
import Boom from 'boom'
import * as Configs from '../configs'
import * as ImageManager from '../managers/imageManager'

const config = Configs.get()

const imageModel = Joi.object({
  id: Joi.string().required(),
  type: Joi.string().required(),
  url: Joi.string().required()
})

export default (server) => {
  server.route({
    method: 'POST',
    path: '/api/images',
    config: {
      tags: ['api', 'images'],
      description: 'Upload image.',
      plugins: {
        'hapi-swagger': {
          payload: {
            payloadType: 'form',
            responses: {
              '201': {
                'description': 'Created image.',
                'schema': imageModel
              },
              '302': {
                'description': 'Image already exists.',
                'schema': imageModel
              }
            }
          }
        }
      },
      validate: {
        payload: {
          file: Joi.any()
            .meta({ swaggerType: 'file' })
            .required()
        }
      },
      payload: {
        maxBytes: config.server.maxBytes,
        parse: true,
        output: 'stream'
      },
      handler: (req, reply) => {
        console.log(req.payload)
        console.log(req.payload['file'])
        let imageData = req.payload.image
        let type = req.headers.contentType
        return ImageManager.generateImageHash(imageData).then((hash) => {
          return ImageManager.getImageByHash(hash).then((image) => {
            if (image) {
              reply(image).code(302)
            } else {
              return ImageManager.saveImage(type, hash, imageData).then((image) => {
                reply(image).code(201)
              })
            }
          })
        })
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/api/images/{id}',
    config: {
      tags: ['api', 'images'],
      description: 'Get image by id.',
      validate: {
        params: {
          id: Joi.string()
        }
      },
      handler: (req, reply) => {
        const id = req.params.id
        return ImageManager.getImageById(id).then((image) => {
          if (!image) {
            reply(Boom.notFound())
          } else {
            reply(image)
          }
        })
      }
    }
  })
}
