//middleware that blocks any request that is not a GET request
const getOnlyRequests = (req, res, next) => {
  if (req.method !== 'GET')
  // console.log(req.method)
    // console.log("This is not a GET request")
    // return res.status(405).json({ message: 'Method not allowed' });
     return res.status(403).send('Only GET requests are allowed on this path.')

  next();
};

module.exports = getOnlyRequests;
