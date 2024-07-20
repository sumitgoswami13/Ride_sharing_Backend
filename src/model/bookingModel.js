const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
  bookingId: { type: Schema.Types.ObjectId, auto: true, index: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  pickupLocation: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  dropLocation: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  riderId: { type: Schema.Types.ObjectId, ref: 'User' }, // Assuming riderId refers to another user who is a rider
  pickupTime: { type: Date, required: true },
  dropTime: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'canceled'], 
    default: 'pending' 
  }
});

bookingSchema.index({ pickupLocation: '2dsphere' });
bookingSchema.index({ dropLocation: '2dsphere' });
module.exports = mongoose.model('Booking', bookingSchema);
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
