'use strict';

const Hapi = require('@hapi/hapi');
const fetch = require('node-fetch');
const BASE_URL = "https://swapi.dev/api"
const init = async () => {

    const server = Hapi.server({
        port: 8080,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/SWAPI/{entity}/{search}',
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: (request, h) => {
            const { entity, search } = request.params;

            return fetch(BASE_URL + `/${entity}/?search=${search}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    return data
                })
                .catch(err => console.log(err))
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
