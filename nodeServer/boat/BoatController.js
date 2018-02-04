/*
 * Created on Sat Feb 03 2018
 * Prabhab Dewan
 * Copyright (c) 2018
 */

var express = require('express');
var router = express.Router();

var VerifyToken = require(__root + 'auth/VerifyToken');
var Boat = require('./Boat');

// creates a new boat
router.post('/', VerifyToken, function (req, res) {
    console.log(req.body);
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
router.get('/', function (req, res) {
    Boat.find(req.query, function (err, boats) {
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
    Boat.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, boat) {
        if (err) return res.status(500).send({error: "There was a problem updating the boat."});
        res.status(200).send(boat);
    });
});

// add comment to a boat in the database
router.post('/:id/comment', VerifyToken,  function (req, res) {
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
        res.status(200).send(boat);
    });
});

module.exports = router;