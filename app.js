const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swagger = require('./swagger');

require('dotenv').config({
  debug: process.env.DEBUG,
});

const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');

const app = express();
swagger(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);

module.exports = app;
