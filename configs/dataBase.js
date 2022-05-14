const mongoose = require('mongoose');
const Promise = require('bluebird');
const { debug } = require('console');
const util = require('util');

const mongoUri = 'mongodb://localhost:27017/store_db';
// plugin bluebird promise in mongoose
mongoose.Promise = Promise;


const connection = mongoose.createConnection(mongoUri, {
    keepAlive: 1,
    useNewUrlParser: true,
});

connection.on('error', (error) => {
    throw new Error(`Unable to connect to database: ${mongoUri}\n\nMessage: ${error}\n`);
});

connection.once('open', () => {
    // eslint-disable-next-line no-console
    console.info(`
    -----------------------------------------
            Connected to MongoDB
    -----------------------------------------
    `);
});

// print mongoose logs in dev env
if (1) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
        debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
}

exports.mongoose = mongoose;
exports.connection = connection;
