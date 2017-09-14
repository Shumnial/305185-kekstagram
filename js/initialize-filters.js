'use strict';

(function () {
  var uploadImageEffect = document.querySelector('.effect-image-preview');
  var uploadEffectControl = document.querySelector('.upload-effect-controls');
  var uploadEffectLevel = document.querySelector('.upload-effect-level');

  // Выбор фильтра при клике
  window.initializeFilters = function (setValueCallback) {
    uploadEffectControl.addEventListener('click', function (evt) {
      setValueCallback(evt, uploadImageEffect, uploadEffectLevel);
    });
  };
})();
