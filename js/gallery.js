'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');
  var filtersContainer = document.querySelector('.filters');
  var filterRecommend = filtersContainer.querySelector('#filter-recommend');
  var filterPopular = filtersContainer.querySelector('#filter-popular');
  var filterDiscussed = filtersContainer.querySelector('#filter-discussed');
  var filterRandom = filtersContainer.querySelector('#filter-random');


  // Сортировка по количеству лайков
  var sortPopular = function (picturesArray) {
    return picturesArray.slice().sort(function (first, second) {
      return second.likes - first.likes;
    });
  };

  // Сортировка по количеству комменттариев
  var sortDiscussed = function (picturesArray) {
    return picturesArray.slice().sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
  };

  // Случайная сортировка
  var sortRandom = function (picturesArray) {
    return picturesArray.slice().sort(function () {
      return 0.5 - Math.random();
    });
  };

  // Добавляет фотографии с сервера
  var loadedData = null;
  var onLoad = function (data) {
    loadedData = data;
    picturesContainer.appendChild(window.getFragment(loadedData));
  };

  window.backend.load(onLoad, window.error.show);

  // Функция открытия фото. Убирает класс hidden карточке с фотографией и добавляет обработчик закрытия на ESC
  var showGalleryOverlay = function (evt) {
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPhotoEscPress);
  };

  // Функция закрытия фото. Добавляет класс hidden карточке и снимает обработчик закрытия на ESC
  var hideGalleryOverlay = function () {
    galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPhotoEscPress);
  };

  // Скрывает увеличенное изображение при нажатии ESC
  var onPhotoEscPress = function (evt) {
    if (window.utils.isEscEvent(evt.keyCode)) {
      hideGalleryOverlay();
    }
  };

  // Функция открытия фото на ENTER, когда фото в фокусе
  var onPhotoEnterPress = function (evt) {
    if (window.utils.isEnterEvent(evt.keyCode)) {
      showGalleryOverlay();
    }
  };

  // Функция закрытия фото на ENTER, когда "крестик" в фокусе
  var onCrossEnterPress = function (evt) {
    if (window.utils.isEnterEvent(evt.keyCode)) {
      hideGalleryOverlay();
    }
  };

  // Определяет, на картинку ли пришелся клик, поднимаясь до родителя элемента. Получает данные атрибута src при клике на img
  var onPhotoClick = function (evt) {
    if (evt.target !== picturesContainer) {
      showGalleryOverlay();
      var currentImage = evt.target;
      evt.preventDefault();
      while (!currentImage.classList.contains('picture')) {
        currentImage = currentImage.parentNode;
      }
      var photoUrl = currentImage.children[0].getAttribute('src');
      window.preview.update(photoUrl, loadedData);
    }
  };

  // Переключает сортировку фотографий
  var switchFilters = function (evt) {
    picturesContainer.innerHTML = '';
    switch (evt.target) {
      case filterRecommend:
        picturesContainer.appendChild(window.getFragment(loadedData));
        break;
      case filterPopular:
        picturesContainer.appendChild(window.getFragment(sortPopular(loadedData)));
        break;
      case filterDiscussed:
        picturesContainer.appendChild(window.getFragment(sortDiscussed(loadedData)));
        break;
      case filterRandom:
        picturesContainer.appendChild(window.getFragment(sortRandom(loadedData)));
    }
  };

  // Обработчик переключения сортировочных фильтров
  filtersContainer.addEventListener('click', function (evt) {
    if (evt.target.tagName === 'INPUT') {
      window.debounce(function () {
        switchFilters(evt);
      });
    }
  });

  // Обработчик открытия фото на ENTER, когда фото в фокусе
  picturesContainer.addEventListener('keydown', onPhotoEnterPress);

  // Обработчик закрытия фото на клик по крестику
  galleryOverlayClose.addEventListener('click', hideGalleryOverlay);

  // Обработчик закрытия фото на ENTER, когда "крестик" в фокусе
  galleryOverlayClose.addEventListener('keydown', onCrossEnterPress);

  // Отменяет привычное поведение ссылок
  // Открывает увеличенное изображение при клике на уменьшенное
  picturesContainer.addEventListener('click', onPhotoClick);
})();
