 /*
 * Created on Sun Feb 03 2018
 * Rajesh Subedi
 * Copyright (c) 2018 Your Company
 */

var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
            firstname: {type:  String},
            lastname: {type: String},
						gender: {type: String},
						email: {type: String, unique: true},
            password: {type: String},
						dob: {type: String},
						address: {
							  street: {type: String},
						  	city: {type: String},
                state: {type: String},
                zipcode: {type:Number} },
            phone: {type: Number},
            avatar : {type:  String},
            shipping_adddress : [ {street: {type: String}, city: {type: String},
                                   state: {type: String}, zipcode: {type:Number} } ],
           

});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');