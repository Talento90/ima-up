'use strict'

import Hapi from 'hapi'
import * as Configs from './configs'
import Inert from 'inert'
import Vision from 'vision'
import HapiSwagger from 'hapi-swagger'
import Mongoose from 'mongoose'
import Good from 'good'
import Glob from 'glob'
import Controllers from './controllers'
import Joi from 'joi'
import JoiObjectId from 'joi-objectid'

const server = new Hapi.Server()
const config = Configs.get()

server.connection({
  port: process.env.PORT || config.server.port,
  labels: ['ImaUp'],
  router: {
    stripTrailingSlash: true
  }
})

//  Setup Hapi Plugins
server.register(
  [
    Inert,
    Vision,
    {
      register: HapiSwagger,
      options: {
        info: {
          title: 'ImaUp API',
          description: 'ImaUp is a microservice to upload images.',
          version: '1.0'
        },
        tags: [
          {
            'name': 'images',
            'description': 'Api images interface.'
          }
        ],
        enableDocumentation: true,
        documentationPath: '/documentation'
      }
    },
    {
      register: Good,
      options: {
        opsInterval: config.logging.opsInterval,
        reporters: config.logging.reports
      }
    }
  ],
  {
    select: 'ImaUp'
  }, (err) => {
    if (err) {
      throw err
    }
  })

// Setup Mongoose
Mongoose.Promise = global.Promise
Mongoose.connect(config.database.connectionString)
let mongoDb = Mongoose.connection

mongoDb.on('error', () => {
  server.log('error', `Unable to connect to database: ${config.database.connectionString}`)
})

mongoDb.once('open', () => {
  server.log('info', `Connected to database: ${config.database.connectionString}`)
})

// Load all Mongoose models
const models = Glob.sync(__dirname + '/models/*.js')

models.forEach(function (model) {
  require(model)
})

//  Setup Joi Validators
Joi.objectId = JoiObjectId(Joi)

//  Setup Controllers
Controllers(server)

server.start(() => {
  server.log('info', `Server started at port: ${config.server.port}`)
})

export { server }
