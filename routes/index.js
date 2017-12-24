var pouchdb = require('../db/pouchdb');

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
    res.render('log', {
      title: 'Butkus | Log your exercise',
      pathname: 'log'
    });
  },

  update : function (req, res) {
    pouchdb.saveBout(req.body).then(
      function (result) { // success
        res.sendStatus(200);
        return result;
      },
      function (error) { // failure
        throw error;
      }
    );
  },

  delete : function (req, res) {
  }

}; // end exports.log

//  add/remove exercises
exports.exercises = {

  create : function (req, res) {
  },

  read : function(req, res){
    res.render('exercises', {
      title: 'Butkus | Manage your exercise collection',
      pathname: 'exercises',
      exercises: ['jackie', 'jermaine', 'michael', 'marlon', 'tito']
    });
  },

  update : function (req, res) {
    pouchdb.saveExercise(req.body).then(
      function (result) { // success
        res.sendStatus(200);
        return result;
      },
      function (error) { // failure
        throw error;
      }
    );
  },

  delete : function (req, res) {
  }

}; // end exports.exercises
