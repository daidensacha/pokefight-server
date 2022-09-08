// let pokemonData = require('../pokedex.json');
const { DATA_ENDPOINT } = process.env;
let pokemonData = require(`.${DATA_ENDPOINT}`);

// Get all pokemons
const get_all_pokemon = async (req, res, next) => {
  try {
    const { name, id, type } = req.query;
    // check for query params
    // if name is present, return pokemon by name
    if (name) {
      const pokemon = await pokemonData.filter(
        pokemon => pokemon.name.english.toLowerCase() === name.toLowerCase(), // case insensitive
      );
      if (!pokemon) {
        res
          .status(404)
          .json({ message: `Pokemon with name ${name} not found` });
      } else {
        return res.status(200).json({ pokemon });
      }
    }
    // if id is present, return pokemon by id
    else if (id) {
      const pokemon = await pokemonData.filter(
        pokemon => pokemon.id === parseInt(id),
      );
      if (!pokemon) {
        res.status(404).json({ message: `Pokemon with id ${id} not found` });
      } else {
        return res.status(200).json({ pokemon });
      }
    }
    // if type is present, return pokemon by type (Case sensitive)
    else if (type) {
      const pokemon = await pokemonData.filter(pokemon =>
        pokemon.type.includes(type),
      );
      if (pokemon.length === 0) {
        res
          .status(404)
          .json({ message: `Pokemon with type ${type} not found` });
      } else {
        return res.status(200).json({ pokemon });
      }
    }
    // return all pokemon
    res.status(200).json(res.paginatedResults);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// Get pokemon by ID
const get_pokemon_by_id = async (req, res, next) => {
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
  try {
    const { id, info } = req.params;
    const pokemon = await pokemonData.find(
      pokemon => pokemon.id === parseInt(id),
    );

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

module.exports = {
  get_all_pokemon,
  get_pokemon_by_id,
  get_pokemon_by_id_info,
};
