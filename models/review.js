const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: {
        type: String,
        trim: true,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    }
})

module.exports = mongoose.model('Review', reviewSchema);