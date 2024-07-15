const mongoose = require('mongoose');
const { Schema } = mongoose;

const otpSchema = new Schema({
  otpId: { type: Schema.Types.ObjectId, auto: true, index: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  otp: { type: String, required: true },
  expiry: { type: Date, required: true },
  isVerified: { type: Boolean, default: false }
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
