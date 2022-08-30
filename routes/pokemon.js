const express = require('express');
const pokemonRouter = express.Router();

// Middleware
const getOnlyRequests = require('../middlewares/getOnlyRequests');

const { get_all_pokemon,
  get_pokemon_by_id,
  get_pokemon_by_id_info } = require('../controllers/pokemon');

pokemonRouter
  .route('/')
  .get(getOnlyRequests, get_all_pokemon);
  // .get(get_all_pokemon);

pokemonRouter
  .route('/:id')
  .get(getOnlyRequests, get_pokemon_by_id);
  // .get(get_pokemon_by_id);

  pokemonRouter
  .route('/:id/:info')
  .get(getOnlyRequests, get_pokemon_by_id_info);
  // .get(get_pokemon_by_id_info);

module.exports = pokemonRouter;
