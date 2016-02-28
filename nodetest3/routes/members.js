var express = require('express');
var router = express.Router();

/*
 * GET list_all_members.
 */
router.get('/list_all_members', function (req, res) {
    var db = req.db;
    var item;

    db.open(function (err, db) {
        var collection = db.collection("members");

        // Find all members
        collection.find().toArray(function (err, item) {
            res.json(item);
        })
    });
});

/*
 * GET get_member
 * Parameters:member_id
 */

router.get('/get_member/:member_id', function (req, res) {
    var db = req.db;
    var item;

    db.open(function (err, db) {
        var collection = db.collection("members");

        // Find one member
        collection.findOne({"member_id": req.params.member_id}, function (err, item) {
            res.json(item);
        })
    });
});


/*
 * POST create_member
 * Parameters: ?
 */

router.post('/create_member', function(req, res) {
    var db = req.db;
    var doc;

    db.open(function (err, db) {
        var collection = db.collection("members");

        doc = JSON.parse(req.body.member);
        console.log('Document = ', doc);

        // Insert one member
        collection.insertOne(doc);
        res.json(doc);
    });
});

module.exports = router;