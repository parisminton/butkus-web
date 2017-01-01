var Sequelize = require('sequelize'),
    Bout,
    Exercise,
    Set,
    saveSet,
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
  current_weight: {
    type: Sequelize.INTEGER,
    field: 'current_weight'
  },
  date: {
    type: Sequelize.DATEONLY,
    field: 'date'
  },
  day: {
    type: Sequelize.STRING,
    field: 'day',
  },
  exercises: {
    type: Sequelize.STRING,
  },
  immediate_protein: { 
    type: Sequelize.BOOLEAN,
    field: 'immediate_protein'
  },
  time: {
    type: Sequelize.DATE,
    field: 'time',
  }
});

Exercise = sequelize.define('exercise', {
  name: {
    type: Sequelize.STRING,
    field: 'name',
  },
  stretched_before: {
    type: Sequelize.BOOLEAN,
    field: 'stretched_before',
  },
  sets: {
    type: Sequelize.STRING
  },
  stretched_after: {
    type: Sequelize.BOOLEAN,
    field: 'stretched_after',
  },
  time_limit: {
    type: Sequelize.INTEGER,
    field: 'time_limit',
  }
});

Set = sequelize.define('set', {
  comment: {
    type: Sequelize.TEXT,
    field: 'comment'
  },
  reps: {
    type: Sequelize.INTEGER,
    field: 'reps'
  },
  rest: {
    type: Sequelize.INTEGER,
    field: 'rest'
  },
  weight: {
    type: Sequelize.STRING,
    field: 'weight'
  }
}); 

saveSet = function (data) {
  sequelize.sync().then(function () {
    return Set.create(data);
  }).then(function(s) {
    console.log(s.get( { plain: true } ) );
  });
} // end saveSet

exports.saveSet = saveSet;
