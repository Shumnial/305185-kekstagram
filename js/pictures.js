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


var getRandomComment = function (array) {
  var commentsNumber = [];
  var firstComment = array[Math.floor(Math.random() * array.length)];
  commentsNumber[0] = firstComment;
  var oneOrTwo = Math.floor(1 + Math.random() * 2);
  if (oneOrTwo === 2) {
    var secondComment = array[Math.floor(Math.random() * array.length)];
    while (secondComment === firstComment) {
      secondComment = array[Math.floor(Math.random() * array.length)];
    }
  }
  commentsNumber[1] = secondComment;
  return commentsNumber;
};

var photoElement = [];

for (var i = 0; i <= 24; i++) {
  var photo = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomLikes(15, 200),
    comments: getRandomComment(comments)
  };
  photoElement[i] = photo;
}

var someFunction = function (array) {
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#picture-template').content;
  for (i = 0; i < photoElement.length; i++) {
    var element = template.cloneNode(true);
    element.querySelector('img').setAttribute('src', photoElement[i].url);
    element.querySelector('.picture-comments').textContent = photoElement[i].comments;
    element.querySelector('.picture-likes').textContent = photoElement[i].likes;
    fragment.appendChild(element);
  }
  document.querySelector('.pictures').appendChild(fragment);
};

someFunction(photoElement);


/*
Ок, все работает, теперь можно перейти к сложному - генерации случайных комментариев в функции getRandomComment. Всего она должна решать следующие задачи (по наращиванию функционала):
1. Возвращать комментарий, состоящий из одного или двух элементов массива comments
2. Элементы из массива должны выбираться случайным образом
3. Элементы массива не должны совпадать друг с другом
*/
