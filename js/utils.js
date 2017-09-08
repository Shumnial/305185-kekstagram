'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    // Закрывает форму кадрирования на Enter, когда крестик в фокусе
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
  };
})();
