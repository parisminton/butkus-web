requirejs(['bigwheel'], function (bW) {
  var add_set_button = bW('#addset'),
      add_button = document.getElementById('addset');
      exercise_fieldset = bW('.exercise');
      exercise_field = document.getElementsByTagName('fieldset')[0];

  function addNewSet () {
    var container = document.createDocumentFragment(),
        set_string,
        si = 1 /* set index | get current set length */,
        fieldset = document.createElement('fieldset');

    fieldset.className = 'set' + si;

    set_string =
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
    
    fieldset.innerHTML = set_string;
    add_set_button.before(fieldset);
    // add_button.parentNode.insertBefore(container, add_button);
    // exercise_field.appendChild(container);
  }

  add_set_button.listenFor('click', addNewSet, true);
});
