'use strict';

const Hapi = require('hapi');

// model
var MethodCall = require("./model/MethodCall.js");
var Stats = require("./model/Stats.js");

// create server and bind to multiple IP addr
const server = Hapi.server({
    port: 3335,
    host: '0.0.0.0',
    routes: { cors: { origin: ['*'] } } 
});

// ROUTES
server.route({
    method: 'GET',
    path: '/mongo/status',
    async handler(request, h) {
        const db = request.mongo.db;
        try {
            const result = await db.collection('methods').findOne();

        } catch (err) {
            console.log(err);
            return h.response("DB Connection error").code(500);
        }

        return h.response("OK").code(200);
    }
});


server.route({
    method: 'GET',
    path: '/mongo/data',
    async handler(request, h) {
        const db = request.mongo.db;
        try {
            const result = await db.collection('methods').find( { duration: { $gt: 20 } } );
            result.toArray().then(items => {
                /* deal with items */
                console.log(items);
            })
            return h.response(result).code(200);

        } catch (err) {
            console.log(err);
            const msg = 'internal error';
            return h.response(msg).code(500);
        }
        return 'Hello, world!';
    }
});


server.route({
    method: 'POST',
    path: '/mongo/generatedummy',
    handler: (request, h) => {
        const db = request.mongo.db;
        try {
                var rows = [];
                for (var index = 0; index < 10; index ++) {
                    // 100 is the upper limit (exclusive), and 10 is the lower limit (inclusive)
                    const randomInt = Math.floor(Math.random() * (100 - 10) + 10);
                    rows.push({ name: "methodName", duration: randomInt });
                }
                db.collection('methods').insertMany(rows);

        }  catch (err) {
            console.log(err);
            const msg = 'internal error';
            return h.response(msg).code(500);
        }

        return h.response().code(201);
    }
});



server.route({
    method: 'GET',
    path: '/mongo/stats',
    handler: (request, h) => {
        const db = request.mongo.db;
        /*var aggregationResult = db.collection('methods').aggregate([ { $group: { _id: null, total: {  $sum: "$duration" }}} ],  function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("print ....");
            console.log(result);
        }, useCursor=False);
        */
        var time = -1;
        try {
            const t1 = (new Date()).getTime();
            var aggregationResult = db.collection('methods').aggregate([ { $group: { _id: null, total: {  $sum: "$duration" }}}]);
            const t2 = (new Date()).getTime();
            //console.log(aggregationResult);
            time = t2 - t1;

        } catch (err) {
            console.log(err);
            const msg = 'internal error';
            return h.response(msg).code(500);
        }

        return h.response(JSON.stringify(time)).code(200);
    }
});

/*
server.route({
    method: 'GET',
    path: '/mongo/stats3',
    handler: (request, h) => {
        const db = request.mongo.db;
        var aggregationResult = db.collection('methods').aggregate([ { $group: { _id: null, total: {  $sum: "$duration" }}} ],  function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("print ....");
            console.log(result);
        }, useCursor=False);
        
        var aggregationResult = db.collection('methods').aggregate([ { $group: { _id: null, total: {  $sum: "$duration" }}}]).toArray();
        //console.log(aggregationResult);
        return JSON.stringify(aggregationResult);
    }
});
*/

// SERVER init
const init = async () => {
    const dbOpts = {
        url: 'mongodb://mongo:27017/methodsdb',
        settings: {
            poolSize: 2
        },
        decorate: true
    };
    
    // register hapi-mongodb plugin
    await server.register({
        plugin: require('hapi-mongodb'),
        options: dbOpts
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();