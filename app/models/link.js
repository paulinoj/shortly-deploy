var db = require('../config');
var crypto = require('crypto');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var linkSchema = new Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number,
  created_at : { type : Date, default: Date.now }
});

linkSchema.pre('save', function(next) {
  var currentDate = new Date();

  if (!this.created_at) {
    this.created_at = currentDate;
    var shasum = crypto.createHash('sha1');
    shasum.update(this.url);
    this.code = shasum.digest('hex').slice(0, 5);
  }
  next();
});

var Link = mongoose.model('Link', linkSchema);

module.exports = Link;
