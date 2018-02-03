var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  // firstname: String,
  // lastname: String,

  // email: String,
  // password: String

            firstname: {type: String},
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
						phone: {type: Number} 

});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');