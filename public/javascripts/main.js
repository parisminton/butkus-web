requirejs(['bigwheel'], function (bW) {
  var BUTKUS = BUTKUS || {
        user : {},
        session : {}
      },

      form_state = {
        phases : ['start', 'setup', 'exercise', 'post'],
        current : 'start',
        current_ndx : 0
      },

      form = bW('#log'),
      next_button = bW('#next'),
      add_set_button = bW('#addset');

  function formAdvance () {
    form_state.current_ndx += 1;
    if (form_state.current_ndx >= form_state.phases.length) {
      form_state.current_ndx = 0;
    }
    form_state.current = form_state.phases[form_state.current_ndx];
    form.data('phase', form_state.current);
  }

  function showCurrentFormPhase () {
    formAdvance();
    bW('.current').removeClass('current');
    bW('.phase.' + form_state.current).addClass('current');
  }

  // a bout is created when the user hits one of the 'start logging' buttons.
  function addBout () {
    BUTKUS.bout = BUTKUS.bout || {};
  }

  function addCurrentWeight () {
    BUTKUS.bout = BUTKUS.bout || {};

    BUTKUS.bout.current_weight = bW('#current_weight').val();
  }

  function addSetData () {
  }

  function validateCurrentSetData () {
  }

  function testRemoveClass () {
    bW('section').removeClass('phase');
  }

  function addSet () {
    var container = document.createDocumentFragment(),
        template_string,
        si = 1 /* set index | get current set length */,
        fieldset = document.createElement('fieldset');

    fieldset.className = 'set' + si;

    template_string =
    '<legend>Set ' + (si + 1) + '</legend>' + 
    '<div class="field">' + 
      '<label for="set' + si + '_weight">Weight</label>' + 
      '<input name="set' + si + '_weight" id="set' + si + '_weight">' +
    '</div>' + 
    '<div class="field">' + 
      '<label for="set' + si + '_reps">Reps</label>' + 
      '<input name="set' + si + '_reps" id="set' + si + '_reps">' + 
    '</div>' +
    '<div class="field">' + 
      '<label for="set' + si + '_rest">Rest</label>' + 
      '<input name="set' + si + '_rest" id="set' + si + '_rest">' + 
    '</div>' +
    '<div class="field">' + 
      '<label for="set' + si + '_comment">Comment</label>' + 
      '<textarea name="set' + si + '_comment" id="set' + si + '_comment"></textarea>' + 
    '</div>';
    
    fieldset.innerHTML = template_string;
    add_set_button.before(fieldset);
  }

  add_set_button.listenFor('click', addSet, true);
  next_button.listenFor('click', showCurrentFormPhase, true);
});
