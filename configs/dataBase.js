const mongoose = require('mongoose');
const Promise = require('bluebird');
const { debug } = require('console');
const util = require('util');

const mongoUri = "mongodb://intigoadmin_dev:intigo2020@173.249.46.194:27011/store_db?authSource=intigo_db_dev";
// plugin bluebird promise in mongoose
mongoose.Promise = Promise;


const connection = mongoose.createConnection(mongoUri, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true
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
