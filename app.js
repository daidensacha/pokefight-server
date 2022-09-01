require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const pokemonRouter = require('./routes/pokemon');

const app = express();
app.use(cors());

// let pokemonData = require('./pokedex.json');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pokemon', pokemonRouter);
app.use('/pokemon/:id', pokemonRouter);
app.use('/pokemon/:id/:info', pokemonRouter);

module.exports = app;

