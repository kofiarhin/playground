const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, unique: true },
    status: { type: String, enum: ['pending', 'assigned', 'picked_up', 'on_route', 'delivered'], default: 'pending' },
    eta: { type: Date }
  },
  { timestamps: true }
);

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
