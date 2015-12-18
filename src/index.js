"use strict";

import Hapi from "hapi";
import Joi from "joi";
import config from "./config";

var server = new Hapi.Server();

server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/{yourname*}',
    config: {  // validate will ensure YOURNAME is valid before replying to your request
        validate: { params: { yourname: Joi.string().max(40).min(2).alphanum() } },
        handler: function (req,reply) {
            reply('Hello '+ req.params.yourname + '!');
        }
    }
});

server.start(function() {
    console.log('Now Visit: http://localhost:3000/YOURNAME')
});


export { server };