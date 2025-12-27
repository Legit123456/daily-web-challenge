import mongoose from 'mongoose';

const visitSchema = mongoose.Schema({
  ip: { type: String }, // We'll hash this later for privacy if needed
  browser: { type: String },
  os: { type: String },
  deviceType: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const Visit = mongoose.model('Visit', visitSchema);

export default Visit;