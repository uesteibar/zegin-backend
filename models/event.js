var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var eventSchema = new Schema({
  name:    { type: String },
  date:     { type: Date }
});

module.exports = mongoose.model('Event', eventSchema);