const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
   year: Number,
   make: String,
   model: String,
   img: String,
   description: String,

}, {timestamps:true});

const Cars = mongoose.model('Cars', carSchema);

module.exports = Cars;
