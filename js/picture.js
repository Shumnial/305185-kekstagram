'use strict';

(function () {
  window.picture = {
    // Добавляет изображения галереи, информацию о лайках и комментариев из шаблона в HTML-разметку
    getFragments: function () {
      var fragment = document.createDocumentFragment();
      var template = document.querySelector('#picture-template').content;
      for (var i = 0; i < window.data.length; i++) {
        var element = template.cloneNode(true);
        element.querySelector('img').setAttribute('src', window.data[i].url);
        element.querySelector('.picture-comments').textContent = window.data[i].comments.length;
        element.querySelector('.picture-likes').textContent = window.data[i].likes;
        fragment.appendChild(element);
      }
      return fragment;
    }
  };
})();
