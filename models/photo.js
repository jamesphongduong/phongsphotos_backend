const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  id: Number,
  caption: String,
  imageURL: String
});

module.exports = mongoose.model('Photo', photoSchema);
