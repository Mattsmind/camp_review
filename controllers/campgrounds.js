const Campground = require('./models/campground');
const AppError = require('./utils/AppError');

module.exports.index = async (req, res, next) => {
    const campgrounds = await Campground.find({});

    if (!campgrounds) {
        return next(new AppError('Error Loading Campground Index.', 500))
    }

    res.render('campgrounds/index', { pageTitle: 'All Campgrounds', campgrounds });
};

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new', { pageTitle: 'Create New' })
};

module.exports.createCampground = async (req, res, next) => {
    const newCamp =  new Campground(req.body.campground);
    const createCamp = await newCamp.save();

    res.redirect(`/campgrounds/${newCamp._id}`);
};

module.exports.showCampground = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);

    if (!campground) {
        return next(new AppError('That campground could not be found', 404));
    }

    res.render('campgrounds/details', { pageTitle: campground.title, campground });
};

module.exports.renderEditForm = async (req, res, next) => {
    const { id } = req.params;
    const updateCamp = await Campground.findById(id);

    if (!updateCamp) {
        return next(new AppError('The campground you want to update, could not be found.', 404));
    }

    res.render('campgrounds/update', { pageTitle: 'Edit & Update', campground: updateCamp });
};

module.exports.updateCampground = async (req, res, next) => {
    const { id } = req.params;
    const campground = req.body.campground;
    const updatedCamp = await Campground.findByIdAndUpdate(id, campground, { runValidators: true });

    if (!updatedCamp) {
        return next(new AppError('Could not find the camp to update!', 404));
    }

    res.redirect(`/campgrounds/${id}`);
};

module.exports.deleteCampground = async (req, res, next) => {
    const { id } = req.params;
    const deleteCamp = await Campground.findByIdAndDelete(id)

    if (!deleteCamp) {
        return next(new AppError('The campground could not be found.', 404))
    }
    
    res.redirect('/campgrounds');
};