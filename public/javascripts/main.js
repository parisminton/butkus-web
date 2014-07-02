requirejs(['bigwheel'], function (bW) {
  var BUTKUS = BUTKUS || {
        user : {},
        session : {}
      },
      next_button = bW('#starttimer');
      add_set_button = bW('#addset');

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
  next_button.listenFor('click', addCurrentWeight, true);
});
