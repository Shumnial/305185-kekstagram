'use strict';

(function () {
  window.picture = {
    drawPictures: function () {
      var pictures = document.querySelector('.pictures');
      pictures.appendChild(window.data.getFragments());
    }
  };
})();
