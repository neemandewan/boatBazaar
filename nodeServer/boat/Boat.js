/*
 * Created on Sat Feb 03 2018
 * Prabhab Dewan
 * Copyright (c) 2018
 */
var mongoose = require('mongoose');  
var BoatSchema = new mongoose.Schema({  
  boatImage: [String],
  categories: String,
  name: String,
  price: Number,
  status: Boolean,
  description: String,
  address: {
      street: String,
      city: String,
      state: String,
      zipcode: Number
  },
  comments: [{ body: String, date: String, user: String }],
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdDate: {type: Date, default: Date.now},
  updatedDate: {type: Date, default: Date.now}
});
mongoose.model('Boat', BoatSchema);

module.exports = mongoose.model('Boat');