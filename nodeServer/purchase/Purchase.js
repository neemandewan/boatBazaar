/*
 * Created on Sat Feb 03 2018
 * Prabhab Dewan
 * Copyright (c) 2018
 */

 // status 0: not available for sale, status: 1: on sale, status 2: sold
 var mongoose = require('mongoose');  
 var PurchaseSchema = new mongoose.Schema({  
   boat: {type: mongoose.Schema.Types.ObjectId, ref: 'Boat'},
   oldUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
   user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
   paymentType: String,
   createdDate: {type: Date, default: Date.now}
 });
 mongoose.model('Purchase', PurchaseSchema);
 
 module.exports = mongoose.model('Purchase');