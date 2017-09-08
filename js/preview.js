'use strict';

(function () {
  var galleryOverlayImage = document.querySelector('.gallery-overlay-image');
  var galleryLikesCount = document.querySelector('.likes-count');
  var galleryCommentsCount = document.querySelector('.comments-count');
  window.preview = {
  // Функция отрисовывает изображение и информацию о нем при увеличении фото
    showGalleryOverlay: function (photoObjects) {
      galleryOverlayImage.setAttribute('src', photoObjects.url);
      galleryLikesCount.textContent = photoObjects.likes;
      galleryCommentsCount.textContent = photoObjects.comments.length;
    },

    // Сравниваем полученный url со значением свойства объекта
    getPhotoObject: function (url) {
      var i = 0;
      while (url !== window.data[i].url) {
        i++;
      }
      return window.data[i];
    }
  };
})();
