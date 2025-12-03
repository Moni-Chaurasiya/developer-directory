const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Full-Stack']
  },
  techStack: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Developer', developerSchema);