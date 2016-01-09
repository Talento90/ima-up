"use strict"

import Hapi from "hapi";
import * as configs from "./configs";
import controllers from "./controllers";

const server = new Hapi.Server();
const config = configs.get();

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
                tags: {
                    'foobar/test': 'Example foobar description'
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
                opsInterval: 1000,
                reporters: [
                    {
                        reporter: require('good-console'),
                        events: { log: '*', response: '*' },
                        config: {
                            format: "YYYY-MM-DD HH:mm:ss"
                        }
                    },
                    {
                        reporter: require('good-file'),
                        events: { log: '*', response: '*', ops: '*' },
                        config: {
                            path: config.logging.path,
                            format: "YYYY-MM-DD",
                            extension: ".log",
                            prefix: "ImaUp",
                            rotate: "daily"
                        }
                    }]
            }
        }
    ],
    {
        select: 'ImaUp'
    }, (err) => {
        if (err) {
            throw err
        }
    });

//Setup Controllers
controllers(server);

server.start(() => {
    server.log('info', `Server started at port: ${config.server.port}`);
});

export { server };
