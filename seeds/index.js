const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./placeNames');
const { loremText } = require('./loremText');

// Change this number to adjust how much seed data you need.
const numberOfSeeds = 50;

const randomChange = [.00, .99, .79, .75, .50, .49];

const Campground = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/camp-reviews', {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'conection error:'));
db.once('open', () => {
    console.log("Database Connected!")
});

const nameSeed = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async (num) => {
    await Campground.deleteMany({});

    for (let i = 0; i < num; i++) {
        const location = Math.floor(Math.random() * 1000);
        const entry = new Campground({
            location: `${cities[location].city}, ${cities[location].state}`,
            title: `${nameSeed(descriptors)} ${nameSeed(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: loremText[Math.floor(Math.random() * loremText.length)],
            price: Math.floor(Math.random() * 80 + 10) + randomChange[Math.floor(Math.random() * randomChange.length)] 
        });
        await entry.save();
    }
};

seedDB(numberOfSeeds)
    .then(() => {
        mongoose.connection.close();
        console.log('Datebase Seeded!');
        console.log('Enjoy!!');
    })
    .catch((err) => {
        console.log('Uh Oh! Something went wrong seeding the Database!');
        console.log(err);
    });