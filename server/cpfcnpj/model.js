const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
  {
    value: { type: String, required: true },
    blacklist: { type: Boolean, default: false },
  },
  { timestamps: true },
);

Schema.path('value').validate(async function validation(value) {
  const count = await module.exports.countDocuments({ _id: { $ne: this._id }, value });
  return !count;
}, 'already_registered');

Schema.index({ value: 'text' });

const Model = mongoose.model('cpfcnpj', Schema);

module.exports = Model;
