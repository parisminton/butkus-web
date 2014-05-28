var mongoose = require('mongoose'),
    db,
    trainingBoutSchema,
    TrainingBout,
    bout,
    saveBout;

mongoose.connect('mongodb://localhost/butkus');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('You, sir, are connected to mongo.');
});

trainingBoutSchema = mongoose.Schema({
  current_weight : Number,
  date : Date,
  day : String,
  time : Number,
  immediate_protein : Boolean
});

// create any schema methods before this instantiation
TrainingBout = mongoose.model('TrainingBout', trainingBoutSchema);

saveBout = function (data) {
  var newdate = new Date();

  bout = new TrainingBout ({
    date : newdate
    day : data.day || newdate.getDay(),
    time : data.time || newdate.getTime(),
    current_weight : data.current_weight,
    stretched_before : data.stretched_before,
    stretched_after : data.stretched_after,
    stretched_after : data.stretched_after,
    immediate_protein : data.immediate_protein
  });

  bout.save(function (err, bout) {
    if (err) {
      return console.error(err);
    }
    else {
      console.log('This bout has been saved.');
    }
  });
} // end saveBout

// saveBout( { weight : 176, day : 'Boxing Day' } );
exports.saveBout = saveBout;
