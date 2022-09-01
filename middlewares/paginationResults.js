const paginationResults = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};

  if (startIndex > pokemonData.length) {
    res.status(404).json({ message: 'No more pages' });
  }

  results.currentPage = page;

  if (pokemonData.length % limit !== 0) {
    results.totalPages = Math.ceil(pokemonData.length / limit);
  } else {
    results.totalPages = pokemonData.length / limit;
  }

  if (endIndex < pokemonData.length) {
    results.nextPage = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previousPage = {
      page: page - 1,
      limit: limit,
    };
  }

  results.results = pokemonData.slice(startIndex, endIndex);
  next();
};
