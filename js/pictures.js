'use strict';
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Получает случайное число от min до max
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

// Получает случайный элемент массива
var getRandomArrayElement = function (array) {
  return array[getRandomInteger(0, array.length - 1)];
};

// Получает случайные комментарии в количестве от 1 до 2
var getRandomComments = function () {
  var commentsNumber = [];
  var firstComment = getRandomArrayElement(COMMENTS);
  commentsNumber[0] = firstComment;
  var oneOrTwo = getRandomInteger(1, 2);
  if (oneOrTwo === 2) {
    var secondComment = getRandomArrayElement(COMMENTS);
    while (secondComment === firstComment) {
      secondComment = getRandomArrayElement(COMMENTS);
    }
    commentsNumber[1] = secondComment;
  }
  return commentsNumber;
};

// Создает массив из 25 объектов, присваивает свойствам объектов случайное значение лайков и комментариев
var getPhotoDetails = function () {
  var array = [];
  for (var i = 0; i <= 24; i++) {
    array[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInteger(15, 200),
      comments: getRandomComments()
    };
  }
  return array;
};

// Добавляет изображения галереи, информацию о лайках и комментариев из шаблона в HTML-разметку
var drawPictures = function (photoObjects) {
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#picture-template').content;
  for (var i = 0; i < photoObjects.length; i++) {
    var element = template.cloneNode(true);
    element.querySelector('img').setAttribute('src', photoObjects[i].url);
    element.querySelector('.picture-comments').textContent = photoObjects[i].comments.length;
    element.querySelector('.picture-likes').textContent = photoObjects[i].likes;
    fragment.appendChild(element);
  }
  document.querySelector('.pictures').appendChild(fragment);
};

// Накладывает оверлей и открывает блок с изображением
var showHideOverlay = function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  var galleryOverlay = document.querySelector('.gallery-overlay');
  uploadOverlay.classList.add('hidden');
  galleryOverlay.classList.remove('hidden');
};

// Функция отрисовывает изображение и информацию о нем при увеличении фото
var drawGalleryOverlay = function (photoObjects) {
  showHideOverlay();
  var galleryOverlayPreview = document.querySelector('.gallery-overlay-preview');
  galleryOverlayPreview.querySelector('.gallery-overlay-image').setAttribute('src', photoObjects.url);
  galleryOverlayPreview.querySelector('.likes-count').textContent = photoObjects.likes;
  galleryOverlayPreview.querySelector('.comments-count').textContent = photoObjects.comments.length;
};

var photoElements = getPhotoDetails();
drawPictures(photoElements);

var pictures = document.querySelector('.pictures');
var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

// Скрывает увеличенное изображение при нажатии ESC
var onPhotoEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePhoto();
  }
};

var openPhoto = function (evt) {
  galleryOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPhotoEscPress);
};

var closePhoto = function (evt) {
  galleryOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onPhotoEscPress);
};

pictures.addEventListener('click', function () {
  openPhoto();
});

pictures.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPhoto();
  }
});

// Закрывает увеличенное изображение при клике на крестик
galleryOverlayClose.addEventListener('click', function () {
  closePhoto();
});

galleryOverlayClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePhoto();
  }
});


// Отменяет привычное поведение ссылок
// Открывает увеличенное изображение при клике на уменьшенное
// Получает данные атрибута src при клике на img
pictures.addEventListener('click', function (evt) {
  galleryOverlay.classList.remove('hidden');
  var target = evt.target;
  evt.preventDefault();
  while (!target.classList.contains('picture')) {
    target = target.parentNode;
  }
  var photoUrl = target.children[0].getAttribute('src');
  drawGalleryOverlay(getPhotoObject(photoUrl));
});

// Сравниваем полученный url со значением свойства объекта
var getPhotoObject = function (url) {
  var i = 0;
  while (url !== photoElements[i].url) {
    i++;
  }
  return photoElements[i];
};
