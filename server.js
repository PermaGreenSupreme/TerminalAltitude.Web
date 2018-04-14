'use strict';

const Hapi = require('hapi');
const azure = require('azure-sb');

const server = Hapi.server({
    port: 3001,
    host: 'localhost',
    /*router: {
        stripTrailingSlash: true
    }*/
    routes: {
        cors: {
            origin: ['*'],
            // additionalHeaders: ['cache-control', 'x-requested-with']
        },
        /*files: {
            relativeTo: path.join(__dirname, 'dist')
        }*/
        /*payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        },*/
    }
});

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

server.route({
    /*config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        },
        payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data'
            },
    },*/
    method: 'GET', // '*'
    path: '/api', // '/{any*}'
    handler: require('./server/services/azure-event-hub.service'),
    // handler: require('./server/services/azure-sb.service'),
    /*options: {
        description: 'Say hello!',
        notes: 'The user parameter defaults to \'stranger\' if unspecified',
        tags: ['api', 'greeting']
    }*/
});

server.route({
    method: 'GET',
    path: '/api/send',
    handler: require('./server/services/azure-relay-sender.service'),
    /*handler: (result) => {
        console.log('name triggered', result);
    }*/
});

server.route({
    method: 'GET',
    path: '/api/receive',
    handler: require('./server/services/azure-relay-receiver.service'),
    /*handler: (result) => {
        console.log('name triggered', result);
    }*/
});

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();



/*server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: ['src'],
            // path: ['app/static'],
            listing: false,
            index: ['index.html']
        }
    }
});*/

// return index.html for everything else
/*
server.ext('onPostHandler', (request, reply) => {
    console.log('WORD');
    const response = request.response;
    if (response.isBoom && response.output.statusCode === 404) {
        return reply.file('app/index.html');
    }
    return reply.continue();
});
*/