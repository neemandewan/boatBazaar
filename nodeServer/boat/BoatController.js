/*
 * Created on Sat Feb 03 2018
 * Prabhab Dewan
 * Copyright (c) 2018
 */

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const FCM = require('fcm-push');

var serverKey = 'AAAAys-BQoI:APA91bEjfD4bDhLAXQ_mBHVp-tbqwrkxANPr8m4hLxNl1wgj5hdMtDEDogZm-syEVPT1sFf7dd0066K6Jb3d90dv3-tJoTidkS3hic-UL-l3W7FraujEzu_2aIRs0tkBbiEMp8PaCwyS';
var fcm = new FCM(serverKey);

var message = {
    to: 'registration_token_or_topics', // required fill with device token or topics
    collapse_key: 'your_collapse_key', 
    data: {
    },
    notification: {
        title: 'You received a comment',
        body: ''
    }
};

const VerifyToken = require(__root + 'auth/VerifyToken');
const Boat = require('./Boat');
var ObjectId = require('mongoose').Types.ObjectId;

// limit get number of boats
let lim = 30;

// express validator to check request
let checkBoatJSON = [
	check(['boatImage', 'categories', 'name', 'price', 'status', 'description', 'address.street', 'address.city' , 'address.state', 'address.zipcode']).exists(),
    check(['boatImage', 'categories', 'name', 'price', 'status', 'description', 'address.street', 'address.city' , 'address.state', 'address.zipcode'], 'must be present').isLength({ min: 1 })
];

// express validator to check request
let checkCommentJSON = [
    check(['body', 'date', 'user']).exists(),
    check(['body', 'date', 'user'], 'must be present').isLength({ min: 1 })
]

// creates a new boat
router.post('/', VerifyToken, checkBoatJSON, function (req, res) {
    console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
    
    Boat.create({ 
        boatImage: req.body.boatImage,
        categories: req.body.categories,
        name: req.body.name,
        price: req.body.price,
        status: req.body.status,
        description: req.body.description,
        address: { 
            street: req.body.address.street, 
            city: req.body.address.city, 
            state: req.body.address.state, 
            zipcode: req.body.address.zipcode 
        },
        comments: [],
        user: req.userId 
        }, 
        function (err, boat) {
            if (err) return res.status(500).send({error: "There was a problem adding the information to the database."});
            res.status(200).send(boat);
        });
});

// returns all the boats in the database by userid
router.get('/me', VerifyToken, function (req, res) {
    let q = req.query;
    q.user = req.userId;

    Boat.find(q, function (err, boat) {
        if (err) return res.status(500).send({error: "There was a problem finding the boat."});
        if (!boat) return res.status(404).send({error: "No boat found."});
        res.status(200).send(boat);
    });
});

// returns all the boats in the database
router.get('/', VerifyToken, function (req, res) {
    if(req.query.limit != undefined) {
        lim = parseInt(req.query.limit);
        delete req.query.limit;
    }else lim = 30;

    // db.boats.find({"user": { $nin: [ObjectId("5a7640211560207478aaecd3")] }})
    // https://stackoverflow.com/questions/7878557/cant-find-documents-searching-by-objectid-using-mongoose
    req.query.user = {
        "$nin": new ObjectId(req.userId)
    }

    console.log(req.query)

    Boat.find(req.query).limit(lim).exec(function (err, boats) {
        if (err) return res.status(500).send({error: "There was a problem finding the boats."});
        res.status(200).send(boats);
    });
});


// gets a single boat from the database
router.get('/:id', VerifyToken, function (req, res) {
    Boat.findById(req.params.id, function (err, boat) {
        if (err) return res.status(500).send({error: "There was a problem finding the boat."});
        if (!boat) return res.status(404).send({error: "No boat found."});
        res.status(200).send(boat);
    });
});

// deletes a boat from the database
router.delete('/:id', VerifyToken, function (req, res) {
    Boat.findByIdAndRemove(req.params.id, function (err, boat) {
        if (err) return res.status(500).send({error: "There was a problem deleting the boat."});
        res.status(200).send({message: "deleted"});
    });
});

// updates a single boat in the database
router.put('/:id', VerifyToken,  function (req, res) {
    req.body.updatedDate = Date.now();
    Boat.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, boat) {
        if (err) return res.status(500).send({error: "There was a problem updating the boat."});
        res.status(200).send(boat);
    });
});

// update sale of a single boat in the database
router.put('/me/:id', VerifyToken,  function (req, res) {
    req.body.updatedDate = Date.now();
    req.body.user = req.userId;
    Boat.findByIdAndUpdate(req.params.id, req.body, {new: false}, function (err, boat) {
        if (err) return res.status(500).send({error: "There was a problem updating the boat."});
        res.status(200).send(boat);
    });
});

// add comment to a boat in the database
router.post('/:id/comment', VerifyToken, checkCommentJSON, function (req, res) {
    console.log(req.body.comments.body);

    let query = {
        $push: {
            "comments": {
                body: req.body.comments.body,
                date: req.body.comments.date,
                user: req.body.comments.user
            }
        }
    }

    Boat.findByIdAndUpdate(req.params.id, query, {new: false}, function (err, boat) {
        if (err) return res.status(500).send({error: "There was a problem updating the boat."});

        message.to = req.headers['x-access-token'];
        message.data = req.body.comments;
        message.notification.body = req.body.comments.body;

        fcm.send(message)
        .then(function(response){
            //console.log("Successfully sent with response: ", response);
        })
        .catch(function(err){
            //console.log("Something has gone wrong in push notification!");
            //console.error(err);
        });

        res.status(200).send(boat);
    });
});

module.exports = router;