const express = require('express');
const pokemonRouter = express.Router();

const { DATA_ENDPOINT } = process.env;
let pokemonData = require(`.${DATA_ENDPOINT}`);

// Middleware
const getOnlyRequests = require('../middlewares/getOnlyRequests');
const paginationResults = require('../middlewares/paginationResults');

const { get_all_pokemon,
  get_pokemon_by_id,
  get_pokemon_by_id_info } = require('../controllers/pokemon');

pokemonRouter
  .route('/')
  .get(getOnlyRequests, paginationResults(pokemonData), get_all_pokemon);

pokemonRouter
  .route('/:id')
  .get(getOnlyRequests, get_pokemon_by_id);

pokemonRouter
.route('/:id/:info')
.get(getOnlyRequests, get_pokemon_by_id_info);

module.exports = pokemonRouter;
