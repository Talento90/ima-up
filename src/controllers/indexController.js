'use strict'

export default (server) => {
  server.route({
    path: '/',
    method: 'GET',
    handler: (request, reply) => {
      reply.redirect('/documentation')
    }
  })
}
