const mongoose = require('mongoose');
const { Schema } = mongoose;

const withdrawSchema = new Schema({
  withdrawId: { type: Schema.Types.ObjectId, auto: true, index: true },
  walletId: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

withdrawSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Withdraw = mongoose.model('Withdraw', withdrawSchema);

module.exports = Withdraw;
