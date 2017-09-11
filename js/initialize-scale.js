'use strict';

(function () {
  var resizeControlsValue = document.querySelector('.upload-resize-controls-value');
  var resizeControlInc = document.querySelector('.upload-resize-controls-button-inc');
  var resizeControlDec = document.querySelector('.upload-resize-controls-button-dec');
  var uploadImageEffects = document.querySelector('.effect-image-preview');
  // Увеличивает изображение на 25%
  resizeControlInc.addEventListener('click', function () {
    window.form.getResizeValue(resizeControlsValue, uploadImageEffects, 1);
  });
// Уменьшает изображение на 25%
  resizeControlDec.addEventListener('click', function () {
    window.form.getResizeValue(resizeControlsValue, uploadImageEffects, -1);
  });
})();
