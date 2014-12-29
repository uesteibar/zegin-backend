var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//Models
mongoose.connect('mongodb://localhost/events', function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
});

var events = require('./models/event')(app, mongoose);

var router = express.Router();

router.get('/', function(req, res) {
   res.send("Hello World!");
});

app.use(router);

var EventCtrl = require('./controllers/events');


// CORS header securiy
router.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-type, Accept, Authorization");
    next();
});

app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

router.get('/events', EventCtrl.findEvents);
router.post('/events', EventCtrl.addEvent);
router.get('/events/:id', EventCtrl.findById);
router.put('/events/:id', EventCtrl.updateEvent);
router.delete('/events/:id', EventCtrl.deleteEvent);


app.listen(3000, function() {
  console.log("Zegin server running on http://localhost:3000");
});