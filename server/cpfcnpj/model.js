const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
  {
    value: { type: String, required: true, unique: true },
    blacklist: { type: Boolean, default: false },
  },
  { timestamps: true },
);


const Model = mongoose.model('cpfcnpj', Schema);

module.exports = Model;