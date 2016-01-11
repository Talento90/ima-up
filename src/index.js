'use strict'

import Hapi from 'hapi'
import * as Configs from './configs'
import Controllers from './controllers'
import Inert from 'inert'
import Vision from 'vision'
import HapiSwagger from 'hapi-swagger'

const server = new Hapi.Server()
const config = Configs.get()

server.connection({
  port: process.env.PORT || config.server.port,
  labels: ['ImaUp'],
  router: {
    stripTrailingSlash: true
  }
})

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
Controllers(server)

server.start(() => {
  server.log('info', `Server started at port: ${config.server.port}`)
})

export { server }
