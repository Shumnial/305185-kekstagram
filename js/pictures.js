'use strict';
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var PHOTO_ELEMENTS = [];

var getRandomInteger = function (min, max) {
  Math.floor(Math.random() * (max + 1 - min) + min);
};

var getRandomArrayElement = function (array) {
  return array[getRandomInteger(0, array.length)];
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

for (var i = 0; i <= 24; i++) {
  var photo = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomInteger(15, 200),
    comments: getRandomComments(COMMENTS)
  };
  PHOTO_ELEMENTS[i] = photo;
}

var getGalleryTemplate = function (array) {
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#picture-template').content;
  for (i = 0; i < PHOTO_ELEMENTS.length; i++) {
    var element = template.cloneNode(true);
    element.querySelector('img').setAttribute('src', PHOTO_ELEMENTS[i].url);
    element.querySelector('.picture-comments').textContent = PHOTO_ELEMENTS[i].comments.length;
    element.querySelector('.picture-likes').textContent = PHOTO_ELEMENTS[i].likes;
    fragment.appendChild(element);
  }
  document.querySelector('.pictures').appendChild(fragment);
};

getGalleryTemplate(PHOTO_ELEMENTS);

var showHideOverlay = function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  uploadOverlay.classList.add('hidden');
  var galleryOverlay = document.querySelector('.gallery-overlay');
  galleryOverlay.classList.remove('hidden');
};

showHideOverlay();

var getPhotoDetails = function (array) {
  var fragment = document.createDocumentFragment();
  var galleryBlock = document.querySelector('.gallery-overlay-preview');
  var element = galleryBlock.cloneNode(true);
  element.querySelector('.gallery-overlay-image').setAttribute('src', PHOTO_ELEMENTS[0].url);
  element.querySelector('.likes-count').textContent = PHOTO_ELEMENTS[0].likes;
  element.querySelector('.comments-count').textContent = PHOTO_ELEMENTS[0].comments.length;
  fragment.appendChild(element);
  document.querySelector('.gallery-overlay').replaceChild(fragment, galleryBlock);
};

getPhotoDetails(PHOTO_ELEMENTS);
