'use strict'

import Hapi from 'hapi'
import * as configs from './configs'
import controllers from './controllers'

const server = new Hapi.Server()
const config = configs.get()

server.connection({
  port: process.env.PORT || config.server.port,
  labels: ['ImaUp'],
  router: {
    stripTrailingSlash: true
  }
})

server.register(
  [
    require('inert'),
    require('vision'),
    {
      register: require('hapi-swaggered'),
      options: {
        cache: false,
        stripPrefix: '/api',
        responseValidation: true,
        tagging: {
          mode: 'path',
          pathLevel: 1
        },
        info: {
          title: 'ImaUp API',
          description: 'ImaUp is a microservice to upload images.',
          version: '1.0'
        }
      }
    },
    {
      register: require('hapi-swaggered-ui'),
      options: {
        title: 'ImaUp API',
        path: '/documentation'
      }
    },
    {
      register: require('good'),
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

//  Setup Controllers
controllers(server)

server.start(() => {
  server.log('info', `Server started at port: ${config.server.port}`)
})

export { server }
