/*
 * Created on Sat Feb 03 2018
 * Prabhab Dewan
 * Copyright (c) 2018
 */

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const VerifyToken = require(__root + 'auth/VerifyToken');
const Purchase = require('./Purchase');

// limit get number of purchases
let lim = 30;

// express validator to check request
let checkPurchaseJSON = [
	check(['boat', 'oldUser', 'paymentType']).exists(),
    check(['boat', 'oldUser', 'paymentType'], 'must be present').isLength({ min: 1 })
];

// creates a new purchase
router.post('/', VerifyToken, checkPurchaseJSON, function (req, res) {
    console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
    
    Purchase.create({ 
        boat: req.body.boat,
        oldUser: req.body.oldUser,
        paymentType: req.body.paymentType,
        user: req.userId 
        }, 
        function (err, purchase) {
            if (err) return res.status(500).send({error: "There was a problem adding the information to the database."});
            res.status(200).send(purchase);
        });
});

// returns all the purchases in the database by userid
router.get('/me', VerifyToken, function (req, res) {
    let q = req.query;
    q.user = req.userId;

    Purchase.find(q, function (err, purchase) {
        if (err) return res.status(500).send({error: "There was a problem finding the purchase."});
        if (!purchase) return res.status(404).send({error: "No purchase found."});
        res.status(200).send(purchase);
    });
});

// gets a single purchase from the database
router.get('/:id', VerifyToken, function (req, res) {
    Purchase.findById(req.params.id, function (err, purchase) {
        if (err) return res.status(500).send({error: "There was a problem finding the purchase."});
        if (!purchase) return res.status(404).send({error: "No purchase found."});
        res.status(200).send(purchase);
    });
});

module.exports = router;