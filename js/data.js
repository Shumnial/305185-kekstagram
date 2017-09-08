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

  var OBJECTS_AMOUNT = 25;

// Генерирует случайные комментарии в количестве от 1 до 2
  var getRandomComments = function () {
    var commentCounts = [];
    var firstComment = window.utils.getRandomArrayElement(COMMENTS);
    commentCounts[0] = firstComment;
    var oneOrTwo = window.utils.getRandomInteger(1, 2);
    if (oneOrTwo === 2) {
      var secondComment = window.utils.getRandomArrayElement(COMMENTS);
      while (secondComment === firstComment) {
        secondComment = window.utils.getRandomArrayElement(COMMENTS);
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
        likes: window.utils.getRandomInteger(15, 200),
        comments: getRandomComments()
      };
    }
    return photoObjects;
  };
  window.data = {
    photoElements: getPhotoDetails()
  };
})();
