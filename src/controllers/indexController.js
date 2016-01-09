export default (server) => {
    
    server.route({
        path: '/',
        method: 'GET',
        handler: function (request, reply) {
            reply.redirect('/documentation')
        }
    });
}

