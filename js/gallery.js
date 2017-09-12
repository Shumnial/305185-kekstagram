'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

  window.gallery = {
    loadedData: null
  };
  var onLoad = function (data) {
    window.gallery.loadedData = data;
    pictures.appendChild(window.picture.getFragments(window.gallery.loadedData));
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style.zIndex = '100';
    node.style.margin = '0 auto';
    node.style.textAlign = 'center';
    node.style.background = '#FF0';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = '50%';
    node.style.fontSize = '30px';
    node.style.color = 'black';
    node.style.border = '2px black solid';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onLoad, onError);

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
