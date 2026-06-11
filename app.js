const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const engine = require('ejs-mate');

const Campground = require('./models/campground');

const eventLogger = require('./middleware/eventLogger');
const dbLogger = require('./utils/dbLogger')

mongoose.connect('mongodb://127.0.0.1:27017/camp-reviews', {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'conection error:'));
db.once('open', () => {
    console.log("Database Connected!")
});


const app = express();
const port = 3232;

app.engine('ejs', engine)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(eventLogger);

app.get('/', (req, res) => {
    res.render('home', { pageTitle: 'Home'});
});

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { pageTitle: 'All Campgrounds', campgrounds });
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new', { pageTitle: 'Create New' })
});

app.post('/campgrounds', async (req, res) => {
    const newCamp =  new Campground(req.body.campground);
    await newCamp.save()
        .then(() => {
            dbLogger('DB INFO', `Campground Created. ID: ${newCamp._id}`);
            res.redirect(`campgrounds/${newCamp._id}`);
        })
        .catch((err) => {
            console.log('Something has gone wrong while creating new campground.');
            console.log(err);
            res.send("Whoopsie!!!");
        });
});

app.get('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/details', { pageTitle: campground.title, campground });
});

app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id)
        .then(() => {
            dbLogger('DB INFO', `Campground Deleted. ID: ${id}`)
            res.redirect('/campgrounds');
        })
        .catch((err) => {
            console.log('Uh Oh! Something has gone wrong trying to delete.');
            console.log(err);
            res.send('Whoops!');
        });
});

app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = req.body.campground;
    await Campground.findByIdAndUpdate(id, campground)
        .then((msg) => {
            dbLogger('DB INFO', `Campground Updated. ID: ${id}`);
            res.redirect(`/campgrounds/${id}`);
        })
        .catch((err) => {
            console.log('Uh Oh! Something went wrong trying to update.');
            console.log(`ID: ${id}`);
            console.log(err);
            res.send('Whoops!');
        });
});

app.get('/campgrounds/:id/edit', async (req, res) => {
    const { id } = req.params;
    const updateCamp = await Campground.findById(id);
    res.render('campgrounds/update', { pageTitle: 'Edit & Update', campground: updateCamp });
});

app.use((req, res) => {
    res.status(404).render('404', { pageTitle: '404 NOT FOUND', resource: req.url });
});

app.listen(port, () => {
    console.log(`SERVER UP: http://127.0.0.1:${port}`);
});


