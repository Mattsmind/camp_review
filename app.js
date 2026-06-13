const express = require('express');
const app = express();
const { requestLogger, errorLogger } = require('./middleware/eventLogger');
const globalErrorHandler = require('./middleware/errorMiddleware');

const path = require('path');
const methodOverride = require('method-override');
const engine = require('ejs-mate');

const Campground = require('./models/campground');
const AppError = require('./utils/AppError');

app.engine('ejs', engine)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(requestLogger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});

app.get('/', (req, res) => {
    res.render('home', { pageTitle: 'Home'});
});

app.get('/campgrounds', async (req, res, next) => {
    const campgrounds = await Campground.find({});

    if (!campgrounds) {
        return next(new AppError('Error Loading Campground Index.', 500))
    }

    res.render('campgrounds/index', { pageTitle: 'All Campgrounds', campgrounds });
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new', { pageTitle: 'Create New' })
});

app.post('/campgrounds', async (req, res, next) => {
    const newCamp =  new Campground(req.body.campground);
    const createCamp = await newCamp.save();

    res.redirect(`/campgrounds/${newCamp._id}`);
});

app.get('/campgrounds/:id', async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);

    if (!campground) {
        return next(new AppError('That campground could not be found', 404));
    }

    res.render('campgrounds/details', { pageTitle: campground.title, campground });
});

app.delete('/campgrounds/:id', async (req, res, next) => {
    const { id } = req.params;
    const deleteCamp = await Campground.findByIdAndDelete(id)

    if (!deleteCamp) {
        return next(new AppError('The campground could not be found.', 404))
    }
    
    res.redirect('/campgrounds');
});

app.put('/campgrounds/:id', async (req, res, next) => {
    const { id } = req.params;
    const campground = req.body.campground;
    const updatedCamp = await Campground.findByIdAndUpdate(id, campground, { runValidators: true });

    if (!updatedCamp) {
        return next(new AppError('Could not find the camp to update!', 404));
    }

    res.redirect(`/campgrounds/${id}`);
});

app.get('/campgrounds/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    const updateCamp = await Campground.findById(id);

    if (!updateCamp) {
        return next(new AppError('The campground you want to update, could not be found.', 404));
    }

    res.render('campgrounds/update', { pageTitle: 'Edit & Update', campground: updateCamp });
});

app.all(/.*/, (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorLogger);
app.use(globalErrorHandler);

module.exports = app;
