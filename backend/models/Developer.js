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
  },
  description:{
    type: String,
    default:'No description provided'
  },
  photo:{
    type: String,
    default:''
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },

}, {
  timestamps: true
});

module.exports = mongoose.model('Developer', developerSchema);