const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

companySchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Company', companySchema);
