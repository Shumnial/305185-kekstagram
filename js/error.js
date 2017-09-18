'use strict';

(function () {

  var errorPopup = document.querySelector('.error-popup');

  window.error = {
    show: function (errorMessage) {
      errorPopup.textContent = (errorMessage[0] && errorMessage[0].errorMessage) ? errorMessage[0] && errorMessage[0].errorMessage : errorMessage;
      errorPopup.classList.remove('hidden');
    },
    hide: function () {
      errorPopup.classList.add('hidden');
    }
  };
})();
