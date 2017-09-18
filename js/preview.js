'use strict';

(function () {
  var galleryOverlayImage = document.querySelector('.gallery-overlay-image');
  var galleryLikesCount = document.querySelector('.likes-count');
  var galleryCommentsCount = document.querySelector('.comments-count');

  // Сравниваем полученный url со значением свойства объекта и возвращаем подходящий объект
  var getPhotoObject = function (url, data) {
    var i = 0;
    while (url !== data[i].url) {
      i++;
    }
    return data[i];
  };

  // Функция отрисовывает изображение и информацию о нем при увеличении фото
  window.preview = {
    update: function (url, data) {
      var photoObject = getPhotoObject(url, data);
      galleryOverlayImage.setAttribute('src', photoObject.url);
      galleryLikesCount.textContent = photoObject.likes;
      galleryCommentsCount.textContent = photoObject.comments.length;
    }
  };
})();
