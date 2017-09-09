'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

  var drawPictures = function () {
    pictures.appendChild(window.picture.getFragments());
  };
  drawPictures();

  // Функция открытия фото. Убирает класс hidden карточке с фотографией и добавляет обработчик закрытия на ESC
  var openPhoto = function (evt) {
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPhotoEscPress);
  };

  // Функция закрытия фото. Добавляет класс hidden карточке и снимает обработчик закрытия на ESC
  var closePhoto = function () {
    galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPhotoEscPress);
  };

  // Скрывает увеличенное изображение при нажатии ESC
  var onPhotoEscPress = function (evt) {
    if (window.utils.isEscEvent(evt.keyCode)) {
      closePhoto();
    }
  };

  // Функция открытия фото на ENTER, когда фото в фокусе
  var onPhotoEnterPress = function (evt) {
    if (window.utils.isEnterEvent(evt.keyCode)) {
      openPhoto();
    }
  };

  // Функция закрытия фото на ENTER, когда "крестик" в фокусе
  var onCrossEnterPress = function (evt) {
    if (window.utils.isEnterEvent(evt.keyCode)) {
      closePhoto();
    }
  };

  var onPhotoClick = function (evt) {
    openPhoto();
    var target = evt.target;
    evt.preventDefault();
    while (!target.classList.contains('picture')) {
      target = target.parentNode;
    }
    var photoUrl = target.children[0].getAttribute('src');
    window.preview.showGalleryOverlay(window.preview.getPhotoObject(photoUrl));
  };

  // Обработчик открытия фото на ENTER, когда фото в фокусе
  pictures.addEventListener('keydown', onPhotoEnterPress);

  // Обработчик закрытия фото на клик по крестику
  galleryOverlayClose.addEventListener('click', closePhoto);

  // Обработчик закрытия фото на ENTER, когда "крестик" в фокусе
  galleryOverlayClose.addEventListener('keydown', onCrossEnterPress);

  // Отменяет привычное поведение ссылок
  // Открывает увеличенное изображение при клике на уменьшенное
  // Получает данные атрибута src при клике на img
  pictures.addEventListener('click', onPhotoClick);
})();
