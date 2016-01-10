import Joi from 'joi'
import Boom from 'boom'
import * as configs from '../configs'
import * as ImageManager from '../managers/imageManager'

const config = configs.get()

export default (server) => {
  server.route({
    method: 'POST',
    path: '/api/images',
    config: {
      tags: ['api'],
      description: 'Upload image.',
      validate: {
        payload: Joi.object({
          image: Joi.object().meta({ swaggerType: 'file' })
        }),
        headers: Joi.object({
          'content-type': Joi.string().required().valid(['img/jpg', 'img/png']).message('supported types : xxx')
        })
      },
      payload: {
        maxBytes: config.server.maxBytes,
        allow: 'multipart/form-data',
        output: 'data'
      },
      handler: (req, reply) => {
        let imageData = req.payload.image
        let type = req.headers.contentType
        console.log(req.headers)
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
    //   response: {
    //     schema: Joi.object({
    //       id: Joi.string().description('Image id').required(),
    //       url: Joi.string().description('Image url').required()
    //     }).description('Image Model'),
    //     status: {
    //       201: {description: 'Image created sucessfully.'},
    //       302: {description: 'Image already exstis.'}
    //     }
    //   }
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
