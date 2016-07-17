/**
 * @author Filip Suk (filipsuk@gmail.com)
 */
'use strict';

// Shortcuts to DOM Elements.

var airplane = document.getElementById('list-switch-1');
var redlight = document.getElementById('list-switch-2');
var vibrator = document.getElementById('list-switch-3');

// Update firebase
function setValue(key, value) {
  firebase.database().ref('/' + key).set(value);
}

// Set switch with mdl CSS classes
function setSwitch(ref, key, checked) {
  ref.checked = checked;
  if (checked) {
    ref.parentNode.classList.add('is-checked');
  } else {
    ref.parentNode.classList.remove('is-checked');
  }
}

// Bindings on load.
window.addEventListener('load', function() {
  
  airplane.addEventListener('click', function () {
    setValue('cooldown', +this.checked);
  });

  redlight.addEventListener('click', function () {
    setValue('redlight', +this.checked);
  });

  vibrator.addEventListener('click', function () {
    setValue('brrr', +this.checked);
  });

  firebase.database().ref('/cooldown').on('value', function(dataSnapshot) {
    setSwitch(airplane, 'cooldown', !!+dataSnapshot.val());
    console.log(dataSnapshot.val());
  });

  firebase.database().ref('/redlight').on('value', function(dataSnapshot) {
    setSwitch(redlight, 'redlight', !!+dataSnapshot.val());
    console.log(dataSnapshot.val());
  });

  firebase.database().ref('/brrr').on('value', function(dataSnapshot) {
    setSwitch(vibrator, 'brrr', !!+dataSnapshot.val());
    console.log(dataSnapshot.val());
  });
  
}, false);
