'use strict';

(function () {
  var filtersContainer = document.querySelector('.filters');

  // Добавляет изображения галереи, информацию о лайках и комментариях из шаблона в HTML-разметку
  window.getFragment = function (picturesData) {
    var fragment = document.createDocumentFragment();
    var template = document.querySelector('#picture-template').content;
    picturesData.forEach(function (pictureElement) {
      var element = template.cloneNode(true);
      element.querySelector('img').setAttribute('src', pictureElement.url);
      element.querySelector('.picture-comments').textContent = pictureElement.comments.length;
      element.querySelector('.picture-likes').textContent = pictureElement.likes;
      fragment.appendChild(element);
      filtersContainer.classList.remove('hidden');
    });
    return fragment;
  };
})();
