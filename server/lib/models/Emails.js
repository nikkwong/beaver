var mongoose = require('mongoose');

var emailSchema = new mongoose.Schema({
  userAgent: String,
  email: String,
  page: String
})

module.exports = mongoose.model('FractalsEmail', emailSchema);