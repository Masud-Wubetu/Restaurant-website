const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  isAvailable: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
