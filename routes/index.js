var sequelize = require('../db/sequelize');

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
    sequelize.saveSet(req.query.exercise[1].set[1]);
  },

  delete : function (req, res) {
  }

}; // end exports.log
