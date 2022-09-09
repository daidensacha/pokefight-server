// Web Dev Simplified Tutorial
// https://www.youtube.com/watch?v=ZX3qt0UWifc

// Middleware to add pagination to the API data

// "model" is the data passed to the middleware to be paginated
// In this case the data is the pokemonData json file

const paginationResults = model => {
  return (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 18;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    if (startIndex > model.length) {
      res.status(404).json({ message: 'No more pages' });
    }
    // Display the current page in the API data
    results.currentPage = page;
    // Calculate the number of pages and display in API
    if (model.length % limit !== 0) {
      results.totalPages = Math.ceil(model.length / limit);
    } else {
      results.totalPages = model.length / limit;
    }
    // Display next page ONLY if there is one
    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    // Display previous page ONLY if there is one
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    results.results = model.slice(startIndex, endIndex);

    res.paginatedResults = results;

    next();
  };
};

module.exports = paginationResults;
