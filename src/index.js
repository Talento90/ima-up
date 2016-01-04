"use strict"

import Hapi from "hapi";
import inert from "inert";
import vision from "vision";
import hapiSwaggered from "hapi-swaggered";
import hapiSwaggeredUI from "hapi-swaggered-ui";
import config from "./config";
import controllers from "./controllers";

var server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 3000,
  labels: ['api'],
  router: {
    stripTrailingSlash: true
  },
  routes: {
    json: {
      space: 2
    }
  }
})

server.register([
  inert,
  vision,
  {
    register: hapiSwaggered,
    options: {
      cache: false,
      stripPrefix: '/api',
      responseValidation: true,
      tagging: {
        mode: 'path',
        pathLevel: 1
      },
      tags: {
        'foobar/test': 'Example foobar description'
      },
      info: {
        title: 'Example API',
        description: 'Powered by node, hapi, joi, hapi-swaggered, hapi-swaggered-ui and swagger-ui',
        version: '1.0'
      }
    }
  },
  {
    register: hapiSwaggeredUI,
    options: {
      title: 'Example API',
      path: '/docs',
      authorization: {
        field: 'apiKey',
        scope: 'query', // header works as well
        defaultValue: 'demoKey',
        placeholder: 'Enter your apiKey here'
      },
      swaggerOptions: {
        validatorUrl: null
      }
    }
  }], {
    select: 'api'
  }, function (err) {
    if (err) {
      throw err
    }
  })

//Setup Controllers
controllers(server);

server.start(function() {
    console.log('Now Visit: http://localhost:3000/YOURNAME')
});

export { server };