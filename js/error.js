'use strict';

(function () {
  var node = document.createElement('div');
  window.error = {
    popupError: function (errorMessage) {
      node.classList.add('error-popup');
      node.style.zIndex = '100';
      node.style.margin = '0 auto';
      node.style.textAlign = 'center';
      node.style.background = '#FF0';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.top = '50%';
      node.style.bottom = 'auto';
      node.style.fontSize = '30px';
      node.style.color = 'black';
      node.style.border = '2px black solid';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    },
    closeError: function () {
      node.classList.add('hidden');
    }
  };
})();
