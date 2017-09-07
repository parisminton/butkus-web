var PouchDB = require('pouchdb'),
    pouchdb,
    saveBout;

pouchdb = new PouchDB ('http://localhost:5984/butkus_dev');

saveBout = function (data) {
  data._id = 'bout_' + /\.(\d{10})/.exec((Math.random() * 10).toString())[1];
  return pouchdb.put(data);
} // end saveBout

exports.saveBout = saveBout;
