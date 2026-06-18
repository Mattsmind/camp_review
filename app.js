const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const engine = require('ejs-mate');

const { requestLogger, errorLogger } = require('./middleware/eventLogger');
const globalErrorHandler = require('./middleware/errorMiddleware');
const AppError = require('./utils/AppError')

const motelRoutes = require('./routes/motels');

app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(requestLogger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


app.get( '/favicon.ico', (req, res) => res.status(204).end() );
app.get('/', (req, res) => res.render('home', { pageTitle: 'Home'}) );

app.use('/motels', motelRoutes);

app.all(/.*/, (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorLogger);
app.use(globalErrorHandler);

module.exports = app;
