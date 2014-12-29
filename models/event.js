var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var eventSchema = new Schema({
  name:    		{ type: String },
  date:     	{ type: Date },
  locationText: { type: String},
  locationData: { type: {
  	k: Number,
  	d: Number
  }}
});

module.exports = mongoose.model('Event', eventSchema);