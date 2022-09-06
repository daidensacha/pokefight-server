// let pokemonData = require('../pokedex.json');
const { DATA_ENDPOINT } = process.env;
let pokemonData = require(`.${DATA_ENDPOINT}`);

// Get all pokemons
const get_all_pokemon = async (req, res, next) => {
  try {
    res.status(200).json(res.paginatedResults);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// Get pokemon by ID
const get_pokemon_by_id = async (req, res, next) => {
  // console.log(req.params)
  try {
    const { id } = req.params;
    const pokemon = await pokemonData.find(
      pokemon => pokemon.id === parseInt(id),
    );
    if (!pokemon) {
      res.status(404).json({ message: `Pokemon with id ${id} not found` });
    } else {
      res.status(200).json(pokemon);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// Returns pokemon by id and info (name, type, base)
const get_pokemon_by_id_info = async (req, res, next) => {
  // console.log(req.params)
  try {
    const { id, info } = req.params;
    // console.log('info', info);
    const pokemon = await pokemonData.find(
      pokemon => pokemon.id === parseInt(id),
    );
    // console.log(pokemon[info]);

    if (!pokemon[info]) {
      res
        .status(404)
        .json({ message: `Pokemon with id ${id} and ${info} not found` });
    } else {
      res.status(200).json(pokemon[info]);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    // console.log(pokemonData.length%limit);

    if (startIndex > model.length) {
      res.status(404).json({ message: 'No more pages' });
    }
    if (model.length % limit !== 0) {
      results.totalPages = Math.ceil(model.length / limit);
    } else {
      results.totalPages = model.length / limit;
    }
  };
}

module.exports = {
  get_all_pokemon,
  get_pokemon_by_id,
  get_pokemon_by_id_info,
};
