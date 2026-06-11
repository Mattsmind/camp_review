const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
    title: String,
    image: {
        type: String,
        default: `https://picsum.photos/400?random=${Math.random()}`
    },
    price: Number,
    description: String,
    location: String
});

module.exports = mongoose.model('Campground', campgroundSchema);