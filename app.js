const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
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
app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', indexRouter);
app.use('/api/books', booksRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

module.exports = app;
