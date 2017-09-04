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
var OBJECTS_AMOUNT = 24;
var MIN_RESIZE_VALUE = 25;
var MAX_RESIZE_VALUE = 100;
var RESIZE_VALUE_STEP = 25;
var MIN_DESCR_LENGTH = 30;
var MAX_DESCR_LENGTH = 100;

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
  var commentCounts = [];
  var firstComment = getRandomArrayElement(COMMENTS);
  commentCounts[0] = firstComment;
  var oneOrTwo = getRandomInteger(1, 2);
  if (oneOrTwo === 2) {
    var secondComment = getRandomArrayElement(COMMENTS);
    while (secondComment === firstComment) {
      secondComment = getRandomArrayElement(COMMENTS);
    }
    commentCounts[1] = secondComment;
  }
  return commentCounts;
};

// Создает массив из 25 объектов, присваивает свойствам объектов случайное значение лайков и комментариев
var getPhotoDetails = function () {
  var photoObjects = [];
  for (var i = 0; i <= OBJECTS_AMOUNT; i++) {
    photoObjects[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInteger(15, 200),
      comments: getRandomComments()
    };
  }
  return photoObjects;
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

var galleryOverlayImage = document.querySelector('.gallery-overlay-image');
var galleryLikesCount = document.querySelector('.likes-count');
var galleryCommentsCount = document.querySelector('.comments-count');

// Функция отрисовывает изображение и информацию о нем при увеличении фото
var drawGalleryOverlay = function (photoObjects) {
  galleryOverlayImage.setAttribute('src', photoObjects.url);
  galleryLikesCount.textContent = photoObjects.likes;
  galleryCommentsCount.textContent = photoObjects.comments.length;
};

var photoElements = getPhotoDetails();
drawPictures(photoElements);

var pictures = document.querySelector('.pictures');
var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

// Функция открытия фото. Убирает класс hidden карточке с фотографией и добавляет обработчик закрытия на ESC
var openPhoto = function () {
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
  if (evt.keyCode === ESC_KEYCODE) {
    closePhoto();
  }
};

// Функция открытия фото на ENTER, когда фото в фокусе
var onPhotoEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPhoto();
  }
};

// Функция закрытия фото на ENTER, когда "крестик" в фокусе
var onCrossEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
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
  drawGalleryOverlay(getPhotoObject(photoUrl));
};

// Сравниваем полученный url со значением свойства объекта
var getPhotoObject = function (url) {
  var i = 0;
  while (url !== photoElements[i].url) {
    i++;
  }
  return photoElements[i];
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

var uploadForm = document.querySelector('#upload-select-image');
var uploadFile = uploadForm.querySelector('#upload-file');
var uploadOverlay = uploadForm.querySelector('.upload-overlay');
var uploadImage = uploadForm.querySelector('.upload-image');
var uploadFormClose = uploadForm.querySelector('.upload-form-cancel');

// Открывает форму кадрирования
var openUploadForm = function () {
  uploadOverlay.classList.remove('hidden');
  uploadImage.classList.add('hidden');
  document.addEventListener('keydown', onUploadFormEscPress);
};

// Закрывает формы кадрирования
var closeUploadForm = function () {
  uploadOverlay.classList.add('hidden');
  uploadImage.classList.remove('hidden');
  document.removeEventListener('keydown', onUploadFormEscPress);
};

// Закрывает форму кадрирования на ESC
var onUploadFormEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeUploadForm();
  }
};

// Закрывает форму кадрирования на Enter, когда крестик в фокусе
var onUploadFormCloseEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeUploadForm();
  }
};

// Открывает форму кадрирования после загрузки фото
uploadFile.addEventListener('change', openUploadForm);
// Закрывает форму кадрировании при клике по крестику
uploadFormClose.addEventListener('click', closeUploadForm);
// Закрывает форму кадрирования на Enter, когда крестик в фокусе
uploadFormClose.addEventListener('keydown', onUploadFormCloseEnterPress);

var resizeControlsValue = uploadOverlay.querySelector('.upload-resize-controls-value');
var resizeControlInc = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
var resizeControlDec = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
var uploadImageEffects = uploadOverlay.querySelector('.effect-image-preview');
var imageDescrField = uploadOverlay.querySelector('.upload-form-description');
var imageHashtagsField = uploadOverlay.querySelector('.upload-form-hashtags');

var getResizeValue = function (valueDirection) {
  var defaultResizeValue = parseInt(resizeControlsValue.getAttribute('value'), 10);
  var newResizeValue = defaultResizeValue + (RESIZE_VALUE_STEP * valueDirection);
  if (newResizeValue >= MIN_RESIZE_VALUE && newResizeValue <= MAX_RESIZE_VALUE) {
    resizeControlsValue.setAttribute('value', newResizeValue + '%');
    uploadImageEffects.style.transform = 'scale(' + newResizeValue / 100 + ')';
  }
};

resizeControlInc.addEventListener('click', function () {
  getResizeValue(1);
});

resizeControlDec.addEventListener('click', function () {
  getResizeValue(-1);
});

// Минимальная и максимальная длина поля описания фотографии
var onImageDescrInput = function (evt) {
  if (imageDescrField.value.length < MIN_DESCR_LENGTH) {
    imageDescrField.setCustomValidity('Комментарий должен содержать не менее 30 символов. Текущее количество : ' + imageDescrField.value.length);
  } else if (imageDescrField.value.length > MAX_DESCR_LENGTH) {
    imageDescrField.setCustomValidity('Комментарий должен содержать не более 100 символов. Текущее количество : ' + imageDescrField.value.length);
  } else {
    imageDescrField.setCustomValidity('');
  }
};

// Проверка правильности заполнения поля хэш-тегов
var onImageHashtagsInput = function () {
  var hashtagsValue = imageHashtagsField.value;
  var hashtagsList = hashtagsValue.split(' ');
  imageHashtagsField.setCustomValidity('');
  if (hashtagsList.length > 5) {
    imageHashtagsField.setCustomValidity('Количество хэш-тегов не может быть больше 5');
  } else {
    hashtagsList.sort();
    for (var i = 0; i < hashtagsList.length; i++) {
      if (hashtagsList[i].charAt(0) !== '#') {
        imageHashtagsField.setCustomValidity('Хэш-теги должны начинаться со знака решетки (#)');
      } else if (hashtagsList[i].indexOf('#', 2) > 0) {
        imageHashtagsField.setCustomValidity('Хэш-теги должны разделяться пробелом');
      } else if (hashtagsList[i].length > 20) {
        imageHashtagsField.setCustomValidity('Название хэш-тегов не может превышать 20 символов');
      } else if (hashtagsList[i] === hashtagsList[i + 1]) {
        imageHashtagsField.setCustomValidity('Хэш-теги не должны повторяться!');
      }
    }
  }
};
/*  for (var i = 0; i < hashtagsList.length; i++) {
    if (hashtagsList.length > 5) {
      imageHashtagsField.setCustomValidity('Количество хэш-тегов не может быть больше 5');
    } else if (hashtagsList[i].charAt(0) !== '#') {
      imageHashtagsField.setCustomValidity('Хэш-теги должны начинаться со знака решетки (#)');
    } else if (hashtagsList[i].indexOf('#', 2) > 0) {
      imageHashtagsField.setCustomValidity('Хэш-теги должны разделяться пробелом');
    } else if (hashtagsList[i].length > 20) {
      imageHashtagsField.setCustomValidity('Название хэш-тегов не может превышать 20 символов');
    }
  } */

imageDescrField.addEventListener('input', function (evt) {
  onImageDescrInput();
});

imageHashtagsField.addEventListener('input', function () {
  onImageHashtagsInput();
});
