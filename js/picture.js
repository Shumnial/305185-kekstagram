'use strict';

(function () {
  window.picture = {
    // Добавляет изображения галереи, информацию о лайках и комментариев из шаблона в HTML-разметку
    getFragments: function () {
      var fragment = document.createDocumentFragment();
      var template = document.querySelector('#picture-template').content;
      for (var i = 0; i < window.data.photoElements.length; i++) {
        var element = template.cloneNode(true);
        element.querySelector('img').setAttribute('src', window.data.photoElements[i].url);
        element.querySelector('.picture-comments').textContent = window.data.photoElements[i].comments.length;
        element.querySelector('.picture-likes').textContent = window.data.photoElements[i].likes;
        fragment.appendChild(element);
      }
      return fragment;
    }
  };
})();
