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

    // Сравниваем полученный url со значением свойства объекта и возвращаем подходящий объект
    getPhotoObject: function (url) {
      var i = 0;
      while (url !== window.gallery.loadedData[i].url) {
        i++;
      }
      return window.gallery.loadedData[i];
    }
  };
})();
