// models/humanResource.js
const { connection } = require('../configs/dataBase');

const { Schema } = require('mongoose');


const ReferenceSchema = new Schema({
    value: {
        type: Number,
        default: 1000,
    },
    name: {
        type: String,
        unique: true,
    },

}, {
    timestamps: true,
});

module.exports = connection.model('Reference', ReferenceSchema);

