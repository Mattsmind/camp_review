const mongoose = require('mongoose');
require('dotenv').config({path: require('path').resolve(__dirname, '../.env')});

const cities = require('./cities');
const { prefixes, cores, suffixes } = require('./nameData');
const { motelImages, atmospheres } = require('./descriptions');
const Motel = require('../models/motel');

const numberOfSeeds = 50;
const randomChange = [.00, .99, .79, .75, .50, .49];

const dbUrl = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/vacancy-vibe';

mongoose.connect(dbUrl, {});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("Database Connected!"));

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async (num) => {
    await Motel.deleteMany({});
    console.log("Existing collections cleared.");

    for (let i = 0; i < num; i++) {
        const city = sample(cities);
        const title = `${sample(prefixes)} ${sample(cores)} ${sample(suffixes)}`;

        const motel = new Motel({
            title,
            location: `${city.city}, ${city.state}`,
            image: motelImages[i % motelImages.length],
            description: sample(atmospheres),
            price: Math.floor(Math.random() * 40 + 35) + sample(randomChange),
            geometry: {
                type: "Point",
                coordinates: [city.longitude, city.latitude]
            }
        });
        
        await motel.save();
    }
};

seedDB(numberOfSeeds)
    .then(() => {
        mongoose.connection.close();
        console.log(`Successfully compiled and seeded database with ${numberOfSeeds} records! 🚗💨`);
    })
    .catch(err => console.error('Seeding process failed:', err));
