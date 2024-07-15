const mongoose = require('mongoose');
const { Schema } = mongoose;

const walletSchema = new Schema({
  walletId: { type: Schema.Types.ObjectId, auto: true, index: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, required: true, default: 0 },
  currency: { type: String, required: true, default: 'USD' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
walletSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;
