const mongoose = require('mongoose');
const { Schema } = mongoose;

const ratingReviewSchema = new Schema({
  ratingId: { type: Schema.Types.ObjectId, auto: true, index: true },
  riderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }
});

const RatingReview = mongoose.model('RatingReview', ratingReviewSchema);

module.exports = RatingReview;
