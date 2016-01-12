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
          image: Joi.any().meta({ swaggerType: 'file' }).required()
        }
      },
      payload: {
        maxBytes: config.server.maxBytes,
        parse: true,
        output: 'stream',
        allow: 'multipart/form-data'
      },
      handler: (req, reply) => {
        let data = req.payload
        let contentType = data.image.hapi.headers['content-type']

        return ImageManager.generateImageHash(data.image).then((hash) => {
          return ImageManager.getImageByHash(hash).then((image) => {
            console.log(image)
            if (image) {
              reply(image).code(302)
            } else {
              return ImageManager.saveImage(contentType, hash, '').then((image) => {
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
