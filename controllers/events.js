//File: controllers/tvshows.js
var mongoose = require('mongoose');
var Event  = mongoose.model('Event');


//GET - Return all evets in the DB
exports.findEvents = function(req, res) {
    Event.find(function(err, events) {
        if(err) res.send(500, err.message);

        console.log('GET /events')
        res.status(200).jsonp(events);
    });
};

exports.findRoundMapEvents = function(req,res){
    var geolib = require('geolib');
    console.log(req);
    console.log(req.params.kmr);

    var today = new Date();
        today.setHours(today.getHours() - 5);
        today.setMinutes(0);

    Event.find({"date": {$gt: today}},function(err, events) {
        if(err) res.send(500, err.message);
        var validEvents = [];
        var i = 0;
        

        for (i=0; i<events.length; i++){

            // if (events[i].date > today){
                console.log(events[i].locationData.k);
                console.log(events[i].locationData.D);
                console.log(req.params.k);
                console.log(req.params.D);
                var isInside = geolib.isPointInCircle(
                    {latitude: events[i].locationData.k, longitude: events[i].locationData.D},
                    {latitude: req.params.k,longitude: req.params.D},
                    req.params.kmr*1000
                    );

                if (isInside){
                    validEvents.push(events[i]);
                }
            // }

        }

        console.log('GET /events by geo')
        res.status(200).jsonp(validEvents);
    });
};

//GET - Return an Event with specified ID
exports.findById = function(req, res) {
    Event.findById(req.params.id, function(err, event) {
        if(err) return res.send(500, err.message);

        console.log('GET /event/' + req.params.id);
        res.status(200).jsonp(event);
    });
};

//POST - Insert an new Event in the DB
exports.addEvent= function(req, res) {
    console.log('POST');
    
    var date = new Date(req.body.date);
    var time = new Date(req.body.time);
    // req.body.date = new Date(date.getMonth(), date.getDay(), date.getFullYear(), time.getHours(), time.getMinutes(), 0);
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());
    req.body.date = date;
    console.log(req.body);
    var event = new Event({
        name:           req.body.name,
        date: 	        req.body.date,
        locationText:   req.body.locationText,
        locationData:   req.body.locationData
    });

    event.save(function(err, event) {
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(event);
    });
};


//PUT - Update an Event already exists
exports.updateEvent = function(req, res) {
    Event.findById(req.params.id, function(err, event) {
        event.name   = req.body.petId;
        event.date    = req.body.date;

        event.save(function(err) {
            if(err) return res.send(500, err.message);
            res.status(200).jsonp(event);
        });
    });
};


//DELETE - Delete an Event with specified ID
exports.deleteEvent = function(req, res) {
    Event.findById(req.params.id, function(err, event) {
        event.remove(function(err) {
            if(err) return res.send(500, err.message);
            res.status(200);
        })
    });
};