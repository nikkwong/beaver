var mongoose = require('mongoose');

var priceSchema = new mongoose.Schema({
  vote: Boolean
})

module.exports = mongoose.model('FractalsPrice', priceSchema);