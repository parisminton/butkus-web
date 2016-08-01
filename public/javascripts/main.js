requirejs(['bigwheel'], function (bW) {
  var BUTKUS = BUTKUS || {
        user : {},
        session : {},
        collector : [
          '#current_weight',
          '#date',
          '#day',
          '#time',
          'fieldset.exercise/\\d+/$',
          '#exercise/\\d+/_name',
          '#exercise/\\d+/_stretched_before',
          'fieldset.exercise/\\d+/_set/\\d+/',
          '#exercise/\\d+/_set/\\d+/_weight',
          '#exercise/\\d+/_set/\\d+/_reps',
          '#exercise/\\d+/_set/\\d+/_rest',
          '#exercise/\\d+/_set/\\d+/_comment',
          '#exercise/\\d+/_stretched_after',
          '#immediate_protein'
        ]
      },

      form_state = {
        phases : [],
        current_ndx : 0,
        init : function () {
          var phases = form.find('.phase'),
              i,
              obj;

          for (i = 0; i < phases.length; i += 1) {
            obj = JSON.parse(bW(phases[i]).data('phase'));
            for (key in obj) {
              this.phases[key] = obj[key];
            }
          }
          this.current = this.phases[0];
        }
      },

      form = bW('#log').setForm('#save', 'test').setRequiredFields('.exercise input'),
      next_button = bW('#next'),
      add_set_button = bW('#addset'),
      lamont,
      query = {
        url : 'http://musicbrainz.org/ws/2/artist/',
        data : {
          query : 'artist:Georgia\ Anne\ Muldrow',
          fmt : 'json'
        },
        dataType : 'json',
        lamont : 'sanford',
        success : function (data, stat) {
          console.log(this.data.query);
          console.log(JSON.parse(data));
          console.log(stat);
        },
        error : function (err) {
          console.log('I pray every day.');
        }
      };

      // lamont = bW.ajax(query);

  function advanceForm () {
    form_state.current_ndx += 1;
    if (form_state.current_ndx >= form_state.phases.length) {
      form_state.current_ndx = 0;
    }
    form_state.current = form_state.phases[form_state.current_ndx];
    form.data('phase', form_state.current);
  }

  function showCurrentFormPhase () {
    advanceForm();
    bW('.current').removeClass('current');
    bW('.phase.' + form_state.current).addClass('current');
  }

  // a bout is created when the user hits one of the 'start logging' buttons.
  function addBout () {
    BUTKUS.bout = BUTKUS.bout || {};
    BUTKUS.bout.exercises = BUTKUS.bout.exercises || {};
    BUTKUS.bout.exercises.sets = BUTKUS.bout.exercises.sets || [];
  }

  function addCurrentWeight () {
    if (!BUTKUS.bout) { addBout() }
    BUTKUS.bout.current_weight = bW('#current_weight').val();
  }

  function addSetData (ndx) {
    if (!BUTKUS.bout) { addBout() }
    BUTKUS.bout.exercises.sets.push({
      weight : bW('#set' + ndx + '_weight').val(),
      reps : bW('#set' + ndx + '_reps').val(),
      rest : bW('#set' + ndx + '_rest').val(),
      comment : bW('#set' + ndx + '_comment').val()
    });
  }

  function validateCurrentSetData () {
  }

  function addSet () {
    var container = document.createDocumentFragment(),
        template_string,
        si = bW('fieldset.exercise fieldset').length,
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
  form_state.init();
  form.addCollector(addSetData).collectValues(BUTKUS.collector);

  /*
  function logRequest () {
    console.log('Bienvenidos!');
    console.log(this.responseText);
  }

  var url = "http://musicbrainz.org/ws/2/artist/?query=artist:dilla",
      golden = new XMLHttpRequest();

  golden.addEventListener('load', logRequest);
  golden.open('get', url, true);
  golden.setRequestHeader('Accept', 'application/json');
  golden.send();
  */

});
