'use strict';
var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];


var showHideOverlay = function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  uploadOverlay.classList.add('hidden');
  var galleryOverlay = document.querySelector('.gallery-overlay');
  galleryOverlay.classList.remove('hidden');
};

showHideOverlay();


var getRandomLikes = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};


var getRandomComment = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var photoElement = [];

for (var i = 0; i <= 24; i++) {
  var photo = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomLikes(15, 200),
    comments: comments[getRandomComment(0, comments.length - 1)]
  };
  photoElement[i] = photo;
}

var someFunction = function (array) {
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#picture-template').content;
  for (i = 0; i < 3; i++) {
    var element = template.cloneNode(true);
    element.querySelector('img').textContent = photo.url;
    element.querySelector('.picture-comments').textContent = photo.comments;
    element.querySelector('.picture-likes').textContent = photo.likes;
    fragment.appendChild(element);
  }
  template.appendChild(fragment);
};

someFunction(photoElement);
