'use strict';

(function () {
  var resizeControlsValue = document.querySelector('.upload-resize-controls-value');
  var resizeControlInc = document.querySelector('.upload-resize-controls-button-inc');
  var resizeControlDec = document.querySelector('.upload-resize-controls-button-dec');
  var uploadImageEffects = document.querySelector('.effect-image-preview');

  // Увеличивает изображение на 25%
  window.initializeScale = function (resizeCallback, increaseValue, decreaseValue) {
    resizeControlInc.addEventListener('click', function () {
      resizeCallback(resizeControlsValue, uploadImageEffects, increaseValue);
    });
    // Уменьшает изображение на 25%
    resizeControlDec.addEventListener('click', function () {
      resizeCallback(resizeControlsValue, uploadImageEffects, decreaseValue);
    });
  };
})();
