const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  bookingId: { type: Schema.Types.ObjectId, auto: true, index: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  pickupLocation: { type: String, required: true },
  dropLocation: { type: String, required: true },
  riderId: { type: Schema.Types.ObjectId, ref: 'User' } // Assuming riderId refers to another user who is a rider
});

module.exports = mongoose.model('Booking', bookingSchema);
