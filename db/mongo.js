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
  exercises : [
    {
      name : String,
      date : Date,
      day : Date,
      time : Date,
      stretched_before : Boolean,
      sets : [
        {
          weight : Number,
          reps : Number,
          rest : Number
        }
      ],
      stretched_after : Boolean,
      time_limit : Number,
      elapsed_time : Number,
      comment : String
    }
  ],
  immediate_protein : Boolean
});

// create any schema methods before this instantiation
TrainingBout = mongoose.model('TrainingBout', trainingBoutSchema);

saveBout = function (data) {
  var newdate = new Date();

  bout = new TrainingBout ({
    current_weight : data.current_weight,
    exercises : data.exercises,
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
