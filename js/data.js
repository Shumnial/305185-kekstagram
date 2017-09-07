'use strict';

(function () {
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var OBJECTS_AMOUNT = 24;

// Получает случайное число от min до max
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

// Получает случайный элемент массива
  var getRandomArrayElement = function (array) {
    return array[getRandomInteger(0, array.length - 1)];
  };

// Генерирует случайные комментарии в количестве от 1 до 2
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
  window.data = {
    photoElements: getPhotoDetails(),

// Добавляет изображения галереи, информацию о лайках и комментариев из шаблона в HTML-разметку
    getFragments: function () {
      var fragment = document.createDocumentFragment();
      var template = document.querySelector('#picture-template').content;
      for (var i = 0; i < window.data.photoElements.length; i++) {
        var element = template.cloneNode(true);
        element.querySelector('img').setAttribute('src', window.data.photoElements[i].url);
        element.querySelector('.picture-comments').textContent = window.data.photoElements[i].comments.length;
        element.querySelector('.picture-likes').textContent = window.data.photoElements[i].likes;
        fragment.appendChild(element);
      }
      return fragment;
    }
  };
})();
