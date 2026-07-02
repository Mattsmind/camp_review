const Motel = require('../models/motel');
const Review = require('../models/review');
const AppError = require('../utils/AppError');

module.exports.createReview = async (req, res, next) => {
    const { id } = req.params;
    const motel = await Motel.findById(id);

    if (!motel) {
        return next(new AppError('Motel not found', 404, '/motels'));
    }

    const review = new Review(req.body.review);
    await review.save();

    motel.reviews.push(review._id);
    await motel.save();

    req.flash('success', 'Review created successfully!');
    res.redirect(`/motels/${motel._id}`);
};

module.exports.deleteReview = async (req, res, next) => {
    const { id, reviewId } = req.params;
    
    const motel = await Motel.findById(id);
    if (!motel) {
        return next(new AppError('Motel Not Found.', 404, '/motels'));
    }

    const review = await Review.findById(reviewId);
    if (!review) {
        return next(new AppError('Review Not Found.', 404, '/motels'));
    }

    await Motel.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash('success', 'Review deleted successfully!');
    res.redirect(`/motels/${id}`);
}