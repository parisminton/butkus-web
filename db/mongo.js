var mongoose = require('mongoose'),
    db,
    SetSchema,
    ExerciseSchema,
    BoutSchema, Bout, bout,
    saveBout;

mongoose.connect('mongodb://localhost/butkus');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('You, sir, are connected to mongo.');
});

SetSchema = mongoose.Schema({
  weight : Number,
  reps : Number,
  rest : Number,
  comment : String
});

ExerciseSchema = mongoose.Schema({
  name : String,
  date : Date,
  day : Date,
  time : Date,
  stretched_before : Boolean,
  sets : [SetSchema],
  stretched_after : Boolean,
  time_limit : Number,
  elapsed_time : Number,
});

BoutSchema = mongoose.Schema({
  current_weight : Number,
  exercises : [ExerciseSchema],
  immediate_protein : Boolean
});

// create any schema methods before this instantiation
Set = mongoose.model('Set', SetSchema);
Exercise = mongoose.model('Exercise', ExerciseSchema);
Bout = mongoose.model('Bout', BoutSchema);

saveBout = function (data) {
  var newdate = new Date();

  bout = new Bout ({
    current_weight : data.current_weight,
    exercises : data.exercises,
    /*
    date : data.date || newdate,
    day : data.day || newdate.getDay(),
    time : data.time || newdate.getTime(),
    stretched_before : data.stretched_before,
    stretched_after : data.stretched_after,
    */
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
