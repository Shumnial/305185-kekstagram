'use strict';

(function () {
  var node = document.createElement('div');
  document.body.insertAdjacentElement('afterbegin', node);
  node.classList.add('hidden');
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
  node.style.cursor = 'pointer';

  window.error = {
    popupError: function (errorMessage) {
      node.classList.remove('hidden');
      node.textContent = errorMessage;
    },
    closeError: function () {
      node.classList.add('hidden');
    }
  };
})();
