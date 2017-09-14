'use strict';

(function () {
  var filtersContainer = document.querySelector('.filters');
  var filterRecommend = document.querySelector('.filter-recommend');

    // Добавляет изображения галереи, информацию о лайках и комментариях из шаблона в HTML-разметку
  window.getFragment = function (picturesData) {
    var fragment = document.createDocumentFragment();
    var template = document.querySelector('#picture-template').content;
    for (var i = 0; i < picturesData.length; i++) {
      var element = template.cloneNode(true);
      element.querySelector('img').setAttribute('src', picturesData[i].url);
      element.querySelector('.picture-comments').textContent = picturesData[i].comments.length;
      element.querySelector('.picture-likes').textContent = picturesData[i].likes;
      fragment.appendChild(element);
      filtersContainer.classList.remove('hidden');
    }
    return fragment;
  };
})();
