// models/humanResource.js
const { connection } = require('../configs/dataBase');

const { Schema } = require('mongoose');


const ProductSchema = new Schema({
    name: {
        type: String,
    },
    ref: {
        type: Number,
        unique: true,
        required: true,
    },
    brand: {
        type: String,
    },
    source: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    fabricMaterial: {
        type: String,
    },
    description: {
        type: String,
    },

}, {
    timestamps: true,
});

module.exports = connection.model('Product', ProductSchema);

