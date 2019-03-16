const Boom = require('boom');
const Model = require('./model');

exports.create = async ({ value, blacklist }) => {
  const entry = new Model({ value, blacklist });

  await entry.save();

  return entry.toObject();
};

exports.update = ({ id, value, blacklist }) => {
  const $set = {};

  if (value !== undefined) $set.value = value;
  if (blacklist !== undefined) $set.blacklist = blacklist;

  if (Object.keys($set).length) return Model.findByIdAndUpdate(id, { $set });
  return Model.findById(id);
};

exports.list = ({ order, value }) => {

};

