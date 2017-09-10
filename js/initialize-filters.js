'use strict';

(function () {
  var values = {
    MIN_PIN_POSITION: 0,
    MAX_PIN_POSITION: 455,
    DEFAULT_PIN_POSITION: 455 * 0.20
  };

  var currentEffect = null;

  window.initializeFilters = {
    getScaleValue: function (value, pictureElement) {
      switch (currentEffect) {
        case 'effect-chrome':
          pictureElement.style.filter = 'grayscale(' + (value) / values.MAX_PIN_POSITION + ')';
          break;
        case 'effect-sepia':
          pictureElement.style.filter = 'sepia(' + (value) / values.MAX_PIN_POSITION + ')';
          break;
        case 'effect-marvin':
          pictureElement.style.filter = 'invert(' + Math.floor((value) * 100 / values.MAX_PIN_POSITION) + '%)';
          break;
        case 'effect-phobos':
          pictureElement.style.filter = 'blur(' + (value) * 3 / values.MAX_PIN_POSITION + 'px)';
          break;
        case 'effect-heat':
          pictureElement.style.filter = 'brightness(' + (value) * 3 / values.MAX_PIN_POSITION + ')';
          break;
        default:
          pictureElement.style.filter = 'none';
      }
    },

    onEffectPreviewClick: function (evt, pictureElement, pin, pinLevelValue, effectLevel) {
      if (evt.target.tagName === 'INPUT') {
        var effectName = evt.target.value;
        pictureElement.classList.remove(currentEffect);
        currentEffect = 'effect-' + effectName;
        pictureElement.classList.add(currentEffect);
        // Значения фильтра и ползунка по умолчанию
        pin.style.left = values.DEFAULT_PIN_POSITION + 'px';
        pinLevelValue.style.width = pin.style.left;
        if (currentEffect !== 'effect-none') {
          effectLevel.classList.remove('hidden');
        } else {
          effectLevel.classList.add('hidden');
        }
        window.initializeFilters.getScaleValue(values.DEFAULT_PIN_POSITION, pictureElement);
      }
    }
  };
})();
