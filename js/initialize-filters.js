'use strict';

(function () {
  var uploadImageEffects = document.querySelector('.effect-image-preview');
  var uploadEffectsControls = document.querySelector('.upload-effect-controls');
  var pinHandle = document.querySelector('.upload-effect-level-pin');
  var pinValue = document.querySelector('.upload-effect-level-val');
  var uploadEffectLevel = document.querySelector('.upload-effect-level');

  // Выбор фильтра при клике
  window.initializeFilters = function (setValueCallback) {
    uploadEffectsControls.addEventListener('click', function (evt) {
      setValueCallback(evt, uploadImageEffects, pinHandle, pinValue, uploadEffectLevel);
    });
  };
})();
