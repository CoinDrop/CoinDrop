var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CampaignSchema = new Schema({
  title: String,
});

module.exports = mongoose.model('Campaign', CampaignSchema);
