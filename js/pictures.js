'use strict';
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var getRandomArrayElement = function (array) {
  return array[getRandomInteger(0, array.length - 1)];
};

var getRandomComments = function (array) {
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

var getPhotoDetails = function () {
  var array = [];
  for (var i = 0; i <= 24; i++) {
    array[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInteger(15, 200),
      comments: getRandomComments(COMMENTS)
    };
  }
  return array;
};

var getGalleryTemplate = function (array) {
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#picture-template').content;
  for (var i = 0; i < photoElements.length; i++) {
    var element = template.cloneNode(true);
    element.querySelector('img').setAttribute('src', photoElements[i].url);
    element.querySelector('.picture-comments').textContent = photoElements[i].comments.length;
    element.querySelector('.picture-likes').textContent = photoElements[i].likes;
    fragment.appendChild(element);
  }
  document.querySelector('.pictures').appendChild(fragment);
};

var showHideOverlay = function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  var galleryOverlay = document.querySelector('.gallery-overlay');
  uploadOverlay.classList.add('hidden');
  galleryOverlay.classList.remove('hidden');
};

var getPhotoTemplate = function (array) { // функция добавляет изображение и информацию о нем при увеличении фото
  // создаем фрагмент, записываем его в переменную
  // выбираем блок в HTML-коде, в котором будем менять разметку
  var galleryBlock = document.querySelector('.gallery-overlay-preview');
  // выбираем вложенный блок, заменяем значение его атрибута на значение свойства нулевого элемента массива (задаем атрибуту src тега img адрес изображения)
  galleryBlock.querySelector('.gallery-overlay-image').setAttribute('src', array[0].url); //
  // Аналогично предыдущему шагу, но указываем в текстовом виде количество лайков на фотографии
  galleryBlock.querySelector('.likes-count').textContent = array[0].likes;
  // Аналогично, но в данном случае нам нужен не текст комментариев, а их количество, поэтому используем .length
  galleryBlock.querySelector('.comments-count').textContent = array[0].comments.length;
};

var photoElements = getPhotoDetails();
getGalleryTemplate(photoElements);
showHideOverlay();
getPhotoTemplate(photoElements);
