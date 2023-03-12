const advancedResults = (modal, populate) => async (req, res, next) => {
  const { select, sort } = req.query;

  let query;

  let queryStr = JSON.stringify(req.query);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = modal.find(JSON.parse(queryStr));

  if (select) {
    const fieldsList = select.split(',').join(' ');
    query = query.select(fieldsList);
  }

  if (sort) {
    const sortList = sort.split(',').join(' ');
    query = query.sort(sortList);
  } else {
    query = query.sort('-createdAt');
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await modal.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  const results = await query;

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};
module.exports = advancedResults;
