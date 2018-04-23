var express = require('express');
var router = express.Router();

var VerifyToken = require('./VerifyToken');
var User = require('../user/User');

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config'); // get config file

router.post('/login', function(req, res) {
  console.log(req.body);

  User.findOne({ email: req.body.email }, function (err, user) {
    console.log(user);
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    
    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token });
  });

});

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});


// user regestration @created by rajesh
router.post('/register', function(req, res) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    // name : req.body.name,
    // email : req.body.email,
    // password : hashedPassword,

    firstname :  req.body.firstname,
    lastname : req.body.lastname,
    email : req.body.email,
    password : hashedPassword,
    gender : req.body.gender,
    dob : req.body.dob,
    phone : req.body.phone,
    address : {
        street : req.body.address.street,
        city : req.body.address.city,
        state: req.body.address.state,
        zipcode : req.body.address.zipcode },
    avatar : req.body.avatar,
    shipping_adddress : [],
  }, 
  
  function (err, user) {
    if (err) return res.status(500).send("There was a problem registering the user`.");

    // if user is registered without errors
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  });

});

// add comment to a boat in the database
router.post('/:id/shipadd', VerifyToken,  function (req, res) {
  console.log(req.body.shipping_adddress.body);
  let query = {
      $push: {
          "shipping_adddress": {
            street : req.body.shipping_adddress.street,
            city : req.body.shipping_adddress.city,
            state: req.body.shipping_adddress.state,
            zipcode : req.body.shipping_adddress.zipcode
          }
      }
  }
  User.findByIdAndUpdate(req.params.id, query, {new: false}, function (err, user) {
      if (err) return res.status(500).send({error: "There was a problem updating the user."});
      res.status(200).send(user);
  });
});


router.get('/me', VerifyToken, function(req, res, next) {

  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });

});

router.put('/me', VerifyToken, function(req, res, next) {
  
  if(req.body.password != undefined) {
    delete req.body['password'];
  }else if(req.body._id != undefined) {
    delete req.body['_id'];
  }

  User.findByIdAndUpdate(req.userId, req.body, {new: false}, function (err, user) {
      if (err) return res.status(500).send({error: "There was a problem updating the user."});
      res.status(200).send({"success": "true"});
  });
});

module.exports = router;