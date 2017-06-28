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
    type: Sequelize.STRING, // ??
    field: 'bout_id' // This should be the current Bout.bout_id
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
    type: Sequelize.STRING, // ??
    field: 'exercise_id' // Should be the current Exercise.exercise_id
  }
}); 

saveBout = function (data) {
  var bout_data = {},
      exercise_data = [],
      set_data = [],
      ex = data.body.exercise,
      i,
      j;

  function saveBoutTables () {
    for (i = 0; i < set_data.length; i += 1) {
      Set.create(set_data[i]);
    }
    for (i = 0; i < exercise_data.length; i += 1) {
      Exercise.create(exercise_data[i]);
    }
    Bout.create(bout_data);
    // should this function return a value?
  } // end saveBoutTables

  sequelize.sync().then(function () {
    var bout_id,
        exercise_id;

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

    // parse bouts data
    for (key in data.body) {
      if (key != 'exercise') {
        bout_data[key] = data.body[key];
        bout_data.bout_id = createID();
      }
    }

    // parse exercise data
    for (i = 0; i < ex.length; i += 1) {

      for (key in ex[i]) {
        exercise_data.push({ // initialize the row with IDs
          bout_id : bout_data.bout_id,
          exercise_id : createID(ex[i].name)
        });

        if (key != 'set') {
          exercise_data[i][key] = ex[i][key];
        }

        else { // parse set data
          set_data.push({ // initialize the row with IDs
            exercise_id : exercise_data[i].exercise_id
          }); 
          for (j = 0; j < ex[i][key].length; j += 1) {
            set_data[j].set_id = createID(ex[i].name, j.toString());

            for (s_key in ex[i][key][j]) {
              set_data[j][s_key] = ex[i][key][j][s_key];
            }
          }
        } // end set_data iteration
      } // end exercise_data iteration
    }

    // save everything to the database
    return saveBoutTables();
  });
} // end saveBout

exports.saveBout = saveBout;
