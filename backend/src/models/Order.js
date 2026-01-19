const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem'
      },
      quantity: Number
    }
  ],
  status: {
    type: String,
    enum: ['pending', 'preparing', 'completed'],
    default: 'pending'
  },
  totalPrice: Number
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
