const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create geolocation Schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
});

const restuarantSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    description: {
        type: String
    },
    rating:{
        type: Number,
    },
    overallrating:{
        type: Number,
        default: 4
    },
    numberofrating:{

        type: Number,
        default: 7
    },
    geometry: GeoSchema
});

const Restaurant = mongoose.model('restaurant', restuarantSchema);

module.exports = Restaurant;
