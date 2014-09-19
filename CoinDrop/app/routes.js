var path = require('path');
var Campaign = require('./config/models/campaign.js')
var express = require('express');

module.exports = function(app) {
var router = express.Router();

  router.use(function(req, res, next) {
    console.log('ROUTING IN PROGRESS.');//this will happen everytime a request is sent to the api
    next();//make sure we go to the next routes and don't stop here
  });

  //server routes here
  router.route('/campaigns')

    .get(function(req, res) {
console.log(typeof Campaign.find);
      Campaign.find(function(err, campaigns) {
console.log(campaigns);
        if(err) {
          res.send(err);
        }
        res.json(campaigns);
      });
    });

    .post(function(req, res) {
      var campaign = new Campaign();
console.log("Object.keys(req.body) ===========>\n"+Object.keys(req.body));
      campaign.title = req.body.title;
      campaign.save(function(err) {
        if(err) {
          res.send(err);
        }
        res.json({ message: 'a new campaign is created!' });
      });
    })

  router.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  app.use('/api', router);
};
