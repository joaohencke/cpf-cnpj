const Model = require('./model');

exports.create = async ({ value, blacklist }) => {
  const entry = new Model({ value, blacklist });

  await entry.save();

  return entry.toObject();
};

exports.update = ({ _id, value, blacklist }) => {
  const $set = {};

  if (value !== undefined) $set.value = value;
  if (blacklist !== undefined) $set.blacklist = blacklist;

  if (Object.keys($set).length) return Model.findByIdAndUpdate(_id, { $set });
  return Model.findById(_id);
};

exports.get = ({ _id }) => Model.findById(_id).lean();

exports.list = async ({ order, filter, page = 0, limit = 10 }) => {
  const query = {};

  if (filter) {
    const regexQuery = new RegExp(filter.replace(/[^0-9a-zA-Z]+/g, ''), 'i');
    query.value = regexQuery;
  }

  let mongoSearch = Model.find(query);

  if (order) mongoSearch = mongoSearch.sort(order);
  if (page) mongoSearch = mongoSearch.skip(parseInt(page, 10) * limit).limit(limit);

  const [items, total] = await Promise.all([mongoSearch.exec(), Model.countDocuments(query)]);
  return { items, total };
};
