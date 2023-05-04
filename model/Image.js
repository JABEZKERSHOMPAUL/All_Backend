const mongoose = require('mongoose');

const imageschema = mongoose.Schema({
  image: { type: String, default: '' },
});

const Image = mongoose.model('image', imageschema);

module.exports = Image;
