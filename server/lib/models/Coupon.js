var mongoose = require('mongoose');

var couponSchema = new mongoose.Schema({
  code: String,
  email: String,
  item: String,
  used: Boolean
})

module.exports = mongoose.model('FractalsCoupon', couponSchema);