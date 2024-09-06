const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  plane_name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    enum: ['monthly', 'annually'],
    required: true
  },
  features: {
    type: [String],
    required: true
  },
  availability: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Plan', planSchema);
