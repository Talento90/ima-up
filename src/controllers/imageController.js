import Joi from 'joi'
import Boom from 'boom'
import Mongoose from 'mongoose'
// import fs from 'fs'
// import * as Configs from '../configs'
// import * as ImageManager from '../managers/imageManager
// const config = Configs.get()

const imageModel = Joi.object({
  id: Joi.string().required().example('23915581-9d85-4af2-9245-fc5bb3b1757f'),
  type: Joi.string().required().example('image/png'),
  created: Joi.string().required().isoDate().description('ISO date string').example('2016-01-23T22:07:05+00:00')
}).label('Image Model').description('Json body for image.')

// var imageHTTPStatus = {
//   '201': {
//     'description': 'Created image.',
//     'schema': imageModel
//   },
//   '302': {
//     'description': 'Image already exists.',
//     'schema': imageModel
//   }
// }

export default (server) => {
  const Image = Mongoose.model('Image')
  //   server.route({
  //     method: 'POST',
  //     path: '/api/images',
  //     config: {
  //       handler: (req, reply) => {
  //         let data = req.payload.image
  //         let contentType = data.headers['content-type']
  //         let imagePath = data.path

  //         var imageStream = fs.createReadStream(imagePath)
  //         return ImageManager.generateImageHash(imageStream).then((hash) => {
  //           return ImageManager.getImageByHash(hash).then((image) => {
  //             if (image) {
  //               reply(image).code(302)
  //             } else {
  //               imageStream = fs.createReadStream(imagePath)
  //               return ImageManager.saveImage(contentType, hash, imageStream)
  //                 .then((image) => {
  //                   reply(image).code(201)
  //                 })
  //             }
  //           })
  //         })
  //       },
  //       description: 'Upload a image file.',
  //       plugins: {
  //         'hapi-swagger': {
  //           responses: imageHTTPStatus,
  //           payloadType: 'form'
  //         }
  //       },
  //       tags: ['api', 'images'],
  //       validate: {
  //         payload: {
  //           image: Joi.any()
  //             .meta({ swaggerType: 'file' })
  //             .required()
  //             .description('Valid image file.')
  //         }
  //       },
  //       payload: {
  //         maxBytes: config.server.maxBytes,
  //         parse: true,
  //         output: 'file',
  //         allow: 'multipart/form-data'
  //       }
  //     }
  //   })

  server.route({
    method: 'GET',
    path: '/api/images/{id}',
    config: {
      handler: (req, reply) => {
        const id = req.params.id

        Image.findById(id)
          .then((image) => {
            if (!image) {
              reply(Boom.notFound())
            } else {
              reply(image)
            }
          })
          .catch((error) => {
            reply(Boom.internal('Internal MongoDB error', error))
          })
      },
      tags: ['api', 'images'],
      description: 'Get image by id.',
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              'description': 'Image already exists.',
              'schema': imageModel
            },
            '404': {
              'description': 'Image does not exists.'
            }
          }
        }
      },
      validate: {
        params: {
          id: Joi.string()
        }
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/api/images/{id}/file',
    config: {
      handler: (req, reply) => {
        const id = req.params.id

        Image.findById(id)
          .then((image) => {
            if (!image) {
              reply(Boom.notFound())
            } else {
              reply.file(image.url)
            }
          })
          .catch((error) => {
            reply(Boom.internal('Internal MongoDB error', error))
          })
      },
      tags: ['api', 'images'],
      description: 'Get image file by id.',
      validate: {
        params: {
          id: Joi.string()
        }
      }
    }
  })

  server.route({
    method: 'DELETE',
    path: '/api/images/{id}',
    config: {
      handler: (req, reply) => {
        const id = req.params.id

        Image.findById(id)
          .then((image) => {
            if (!image) {
              reply(Boom.notFound())
            } else {
              // remove
              reply(image)
            }
          })
          .catch((error) => {
            reply(Boom.internal('Internal MongoDB error', error))
          })
      },
      tags: ['api', 'images'],
      description: 'Delete image by id.',
      validate: {
        params: {
          id: Joi.string()
        }
      }
    }
  })
}
