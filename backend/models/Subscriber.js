import mongoose from 'mongoose';

const subscriberSchema = mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true // No duplicate emails allowed
  },
}, { timestamps: true });

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

export default Subscriber;