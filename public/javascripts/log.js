requirejs(['bigwheel'], function (bW) {
  var BUTKUS = BUTKUS || {
        user: {},
        session: {}
      },

      form_state = {
        phases: [],
        current_ndx: 0,
        init: function () {
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
        },
        timers: {}
      },

      form = bW('#log').setForm('#save', 'test').setRequiredFields('.exercise input'),
      next_button = bW('#next'),
      add_set_button = bW('#addset'),
      timer_buttons = bW('#timer0_start, #timer1_start, #timer2_start'),
      reset_buttons = bW('#timer0_reset, #timer1_reset, #timer2_reset');

  function keepTime (evt) {
    evt.preventDefault();

    var ndx = /\d+/.exec(evt.target.parentNode.getAttribute('id'))[0],
        timers = form_state.timers,
        clock;

        clock = bW('#timer' + ndx + '_clock');

    function count () {
      var newtime = timers['timer' + ndx].time += 1/50,
          hours = 0,
          minutes = 0,
          seconds = 0,
          clocktime;

      function clockify (hr, min, sec) {
        var i;

        for (i = 0; i < 3; i += 1) {
          if (/^\d\.|^\d$/.test(arguments[i])) {
            arguments[i] = '0' + arguments[i].toString();
          }
        }
        return hr + ':' + min + ':' + sec;
      } // end clockify

      timers['timer' + ndx].time = newtime;

      seconds = Math.round((newtime % 60) * 100) / 100;

      if ((newtime / 60) >= 1) {
        minutes = Math.floor(newtime / 60);
      }

      if (minutes >= 60) {
        hours = Math.floor(minutes / 60);
        minutes %= 60;
      }

      clocktime = clockify(hours, minutes, seconds);
      clock[0].innerHTML = clocktime;

    } // end count

    // is this timer already running?
    if (!timers['timer' + ndx]) {
      timers['timer' + ndx] = { time: 0 };
      bW('#exercise' + ndx + '_start_time').val(new Date());
    }
    if (!timers['timer' + ndx].tid) {
      timers['timer' + ndx].tid = window.setInterval(count, 20);
      evt.target.innerHTML = 'Pause the timer.'
    }
    else {
      window.clearInterval(timers['timer' + ndx].tid);
      delete timers['timer' + ndx].tid;
      bW('#exercise' + ndx + '_duration').val(timers['timer' + ndx].time);
      evt.target.innerHTML = 'Resume the timer.'
    }
  } // end keepTime

  function resetTime (evt) {
    evt.preventDefault();

    var ndx = /\d+/.exec(evt.target.parentNode.getAttribute('id'))[0],
        timers = form_state.timers,
        clock;

    clock = bW('#timer' + ndx + '_clock');
    clock[0].innerHTML = '00:00:00.00';
    clearInterval(timers['timer' + ndx].tid);
    delete timers['timer' + ndx];
    bW('#timer' + ndx + '_start')[0].innerHTML = 'Start the timer.';
    bW('#exercise' + ndx + '_start_time').val('0');
    bW('#exercise' + ndx + '_duration').val('0');
  } // end resetTime

  function advanceForm () {
    form_state.current_ndx += 1;
    if (form_state.current_ndx >= form_state.phases.length) {
      form_state.current_ndx = 0;
    }
    form_state.current = form_state.phases[form_state.current_ndx];
    form.data('phase', form_state.current);
  } // end advanceForm

  function showCurrentFormPhase () {
    advanceForm();
    bW('.current').removeClass('current');
    bW('.phase.' + form_state.current).addClass('current');
  } // end showCurrentFormPhase

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
      weight: bW('#set' + ndx + '_weight').val(),
      reps: bW('#set' + ndx + '_reps').val(),
      rest: bW('#set' + ndx + '_rest').val(),
      comment: bW('#set' + ndx + '_comment').val()
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

  
  timer_buttons.listenFor('click', keepTime, true);
  reset_buttons.listenFor('click', resetTime, true);
  add_set_button.listenFor('click', addSet, true);
  next_button.listenFor('click', showCurrentFormPhase, true);
  form_state.init();

  console.log('I am the log JS!');

});
