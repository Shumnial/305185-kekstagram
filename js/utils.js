'use strict';

(function () {
  var keyCodes = {
    ESC: 27,
    ENTER: 13
  };
  window.utils = {

    // Получает случайное число от min до max
    getRandomInteger: function (min, max) {
      return Math.floor(Math.random() * (max + 1 - min) + min);
    },

    // Получает случайный элемент массива
    getRandomArrayElement: function (array) {
      return array[window.utils.getRandomInteger(0, array.length - 1)];
    },

    // Закрывает форму кадрирования на ESC
    isEscEvent: function (code) {
      return code === keyCodes.ESC;
    },

    // Закрывает форму кадрирования на Enter, когда крестик в фокусе
    isEnterEvent: function (code) {
      return code === keyCodes.ENTER;
    }
  };
})();
