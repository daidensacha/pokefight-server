let pokemonData = require('../pokedex.json');

// Get all pokemons
const get_all_pokemon = async (req, res, next) => {
  console.log(res);

  try {
    const allPokemon = pokemonData
      .map(pokemon => {
        return {
          id: pokemon.id,
          name: pokemon.name,
          type: pokemon.type,
          base: pokemon.base,
        };
      })
      .sort((a, b) => a.id - b.id);
    res.status(200).json(allPokemon);
    // res.status(200).json(pokemonData);
  } catch (error) {
    console.log(err);
    next(error);
  }
};

// Get pokemon by ID
const get_pokemon_by_id = async (req, res, next) => {
  // console.log(req.params)
  try {
    const { id } = req.params;
    const pokemon = pokemonData.find(pokemon => pokemon.id === parseInt(id));
    if (!pokemon) {
      res.status(404).json({ message: `Pokemon with id ${id} not found` });
    } else {
      res.status(200).json(pokemon);
    }
  } catch (error) {
    console.log(err);
    next(error);
  }
};

// Returns pokemon by id and info (name, type, base)
const get_pokemon_by_id_info = async (req, res, next) => {
  // console.log(req.params)
  try {
    const { id, info } = req.params;
    console.log('info', info);
    const pokemon = pokemonData.find(pokemon => pokemon.id === parseInt(id));
    console.log(pokemon[info]);

    if (!pokemon[info]) {
      res
        .status(404)
        .json({ message: `Pokemon with id ${id} and ${info} not found` });
    } else {
      res.status(200).json(pokemon[info]);
    }
  } catch (error) {
    console.log(err);
    next(error);
  }
};

module.exports = {
  get_all_pokemon,
  get_pokemon_by_id,
  get_pokemon_by_id_info,
};
