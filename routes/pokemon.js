const express = require('express');
const pokemonRouter = express.Router();

const { get_all_pokemon,
  get_pokemon_by_id,
  get_pokemon_by_id_info } = require('../controllers/pokemon');

pokemonRouter
  .route('/')
  .get(get_all_pokemon);

pokemonRouter
  .route('/:id')
  .get(get_pokemon_by_id);

  pokemonRouter
  .route('/:id/:info')
  .get(get_pokemon_by_id_info);

module.exports = pokemonRouter;
