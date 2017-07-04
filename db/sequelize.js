var Sequelize = require('sequelize'),
    Bout,
    Exercise,
    Set,
    saveBout,
    sequelize;

sequelize = new Sequelize ('butkus', 'postgres', 'blahblahblah', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

Bout = sequelize.define('bout', {
  bout_id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  current_weight: {
    type: Sequelize.INTEGER,
    field: 'current_weight'
  },
  date: {
    type: Sequelize.STRING,
    field: 'date'
  },
  day: {
    type: Sequelize.STRING,
    field: 'day'
  },
  /*
  exercises: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    field: 'exercises'
  },
  */
  immediate_protein: { 
    type: Sequelize.BOOLEAN,
    field: 'immediate_protein'
  },
  location: { 
    type: Sequelize.STRING,
    field: 'location'
  },
  time: {
    type: Sequelize.STRING,
    field: 'time'
  }
});

Exercise = sequelize.define('exercise', {
  exercise_id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
  stretched_before: {
    type: Sequelize.BOOLEAN,
    field: 'stretched_before'
  },
  stretched_after: {
    type: Sequelize.BOOLEAN,
    field: 'stretched_after'
  },
  time_limit: {
    type: Sequelize.INTEGER,
    field: 'time_limit'
  },
  bout_id: {
    type: Sequelize.STRING,
    field: 'bout_id'
  }
});

Set = sequelize.define('set', {
  comment: {
    type: Sequelize.TEXT,
    field: 'comment'
  },
  duration: {
    type: Sequelize.FLOAT,
    field: 'duration'
  },
  index: {
    type: Sequelize.INTEGER,
    field: 'index'
  },
  reps: {
    type: Sequelize.INTEGER,
    field: 'reps'
  },
  rest: {
    type: Sequelize.INTEGER,
    field: 'rest'
  },
  set_id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  start_time: {
    type: Sequelize.STRING,
    field: 'start_time'
  },
  weight: {
    type: Sequelize.STRING,
    field: 'weight'
  },
  exercise_id: {
    type: Sequelize.STRING,
    field: 'exercise_id'
  }
}); 

saveBout = function (data) {
  var bout_data = {},
      exercise_data = [],
      set_data = [],
      ex = data.body.exercise,
      i;

  function saveTables () {
    Set.bulkCreate(set_data);
    Exercise.bulkCreate(exercise_data);
    Bout.create(bout_data);
    // should this function return a value?
  } // end saveTables

  function parseExerciseData (ex) {
    var key,
        ex_index;

    exercise_data.push({
      bout_id : bout_data.bout_id,
      exercise_id : createID(ex.name)
    });

    ex_index = (exercise_data.length - 1);

    for (key in ex) {
      // we need all other exercise fields to be populated
      // before we parse 'set', so exclude it from this loop
      if (key != 'set') {
        exercise_data[ex_index][key] = ex[key];
      }
    }
    parseSetData(ex['set']);
  } // end parse ExerciseData

  function parseSetData (set) {
    var i,
        key,
        sd_index;

    for (i = 0; i < set.length; i += 1) {
      set_data.push({
        exercise_id : exercise_data[(exercise_data.length - 1)].exercise_id,
        set_id : createID(exercise_data[(exercise_data.length - 1)].name, i.toString())
      });

      sd_index = (set_data.length - 1);

      for (key in set[i]) {
        set_data[sd_index][key] = set[i][key];
      }
    }
  } // end parseSetData

  function createID (exercise_name, set_index) {
    var id = data.body.date,
        time = '_' + new Date().toLocaleTimeString().replace(' ', '_'),
        location = '_marcusgarvey';

    id += time + location;
    if (exercise_name) {
      id += '_' + exercise_name;
    }
    if (set_index) {
      id += '_' + set_index;
    }
    return id;
  } // end createID

  sequelize.sync().then(function () {
    var bout_id,
        exercise_id;

    // parse bouts data
    for (key in data.body) {
      if (key != 'exercise') {
        bout_data[key] = data.body[key];
        bout_data.bout_id = createID();
      }
    }

    for (i = 0; i < ex.length; i += 1) {
      parseExerciseData(ex[i]);
    }

    // save everything to the database
    return saveTables();
  });
} // end saveBout

exports.saveBout = saveBout;
