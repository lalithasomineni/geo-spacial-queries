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

// create ninja Schema & model
const restSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    description: {
        type: String
    },
    rating: {
        type: [Number],
    },
    geometry: GeoSchema
});

const Rest = mongoose.model('rest', restSchema);

module.exports = Rest;
