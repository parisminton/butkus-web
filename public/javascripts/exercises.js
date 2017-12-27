requirejs(['bigwheel'], function (bW) {
  var BUTKUS = BUTKUS || {
        user: {},
        session: {}
      },

      exercise_form = bW('#exercises').setForm('#submit_exercises', 'test'),

      add_exercise = bW('#add_exercise'),
      remove_exercise = bW('#remove_exercise'),

      add_exercise_button = bW('button.add-exercise'),
      remove_exercise_button = bW('button.remove-exercise'),

      submit_button = bW('#submit_exercises');

  function showAddExercise (evt) {
    evt.preventDefault();
    remove_exercise.removeClass('active').addClass('inactive');
    add_exercise.removeClass('inactive').addClass('active');
    submit_button.attr('value', 'Add this exercise');
  } // end showAddExercise

  function showRemoveExercise (evt) {
    evt.preventDefault();
    remove_exercise.removeClass('inactive').addClass('active');
    add_exercise.removeClass('active').addClass('inactive');
    submit_button.attr('value', 'Remove this exercise');
  } // end showRemoveExercise
  
  add_exercise_button.listenFor('click', showAddExercise);
  remove_exercise_button.listenFor('click', showRemoveExercise);

  console.log('I am the exercises JS!');

});
