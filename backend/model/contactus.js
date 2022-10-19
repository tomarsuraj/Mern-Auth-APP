// Contact us schema
const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
  },
  message: {
    type: String,
  },
});

module.exports = mongoose.model('contactus', contactUsSchema);
