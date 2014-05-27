var mongo = require('../db/mongo');

// home page
exports.index = {

  create : function (req, res) {
  },

  read : function(req, res){
    res.render('index', { title: 'Butkus' });
  },

  update : function (req, res) {
  },

  delete : function (req, res) {
  }

}; // end exports.index

// exercise form
exports.log = {

  create : function (req, res) {
  },

  read : function(req, res){
    res.render('log', { title : 'Butkus | Log your exercise' });
  },

  update : function (req, res) {
    mongo.saveBout({
      current_weight : req.param('current_weight'),
      day : req.param('day'),
      immediate_protein : req.param('immediate_protein')
    });
    // ### should redirect happen here or in saveBout? ###
    // ### should it happen at all? ###
    res.render('boogers');
  },

  delete : function (req, res) {
  }

}; // end exports.log
