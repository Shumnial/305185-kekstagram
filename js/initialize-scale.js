'use strict';

(function () {
  var scaleConstants = {
    MIN_RESIZE_VALUE: 25,
    MAX_RESIZE_VALUE: 100,
    RESIZE_VALUE_STEP: 25
  };

  window.initializeScale = {
    getResizeValue: function (scaleElement, pictureElement, valueDirection) {
      var defaultResizeValue = parseInt(scaleElement.getAttribute('value'), 10);
      var newResizeValue = defaultResizeValue + (scaleConstants.RESIZE_VALUE_STEP * valueDirection);
      if (newResizeValue >= scaleConstants.MIN_RESIZE_VALUE && newResizeValue <= scaleConstants.MAX_RESIZE_VALUE) {
        scaleElement.setAttribute('value', newResizeValue + '%');
        pictureElement.style.transform = 'scale(' + newResizeValue / 100 + ')';
      }
    }
  };
})();
