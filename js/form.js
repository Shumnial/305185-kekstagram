'use strict';

(function () {
  var formConstants = {
    MIN_RESIZE_VALUE: 25,
    MAX_RESIZE_VALUE: 100,
    RESIZE_VALUE_STEP: 25,
    MIN_DESCR_LENGTH: 30,
    MAX_DESCR_LENGTH: 100,
    MAX_HASHTAGS_AMOUNT: 5
  };

  var uploadForm = document.querySelector('#upload-select-image');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
  var uploadImage = uploadForm.querySelector('.upload-image');
  var uploadFormClose = uploadForm.querySelector('.upload-form-cancel');
  var resizeControlsValue = uploadOverlay.querySelector('.upload-resize-controls-value');
  var resizeControlInc = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
  var resizeControlDec = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
  var uploadImageEffects = uploadOverlay.querySelector('.effect-image-preview');
  var imageDescrField = uploadOverlay.querySelector('.upload-form-description');
  var imageHashtagsField = uploadOverlay.querySelector('.upload-form-hashtags');
  var uploadEffectsControls = uploadOverlay.querySelector('.upload-effect-controls');
  var uploadSubmitForm = uploadOverlay.querySelector('.upload-form-submit');

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
    if (window.utils.isEscEvent(evt.keyCode)) {
      closeUploadForm();
    }
  };

  // Закрывает форму кадрирования на Enter, когда крестик в фокусе
  var onUploadFormCloseEnterPress = function (evt) {
    if (window.utils.isEnterEvent(evt.keyCode)) {
      closeUploadForm();
    }
  };

  // Увеличение-уменьшение масштаба фото (scale)
  var getResizeValue = function (valueDirection) {
    var defaultResizeValue = parseInt(resizeControlsValue.getAttribute('value'), 10);
    var newResizeValue = defaultResizeValue + (formConstants.RESIZE_VALUE_STEP * valueDirection);
    if (newResizeValue >= formConstants.MIN_RESIZE_VALUE && newResizeValue <= formConstants.MAX_RESIZE_VALUE) {
      resizeControlsValue.setAttribute('value', newResizeValue + '%');
      uploadImageEffects.style.transform = 'scale(' + newResizeValue / 100 + ')';
    }
  };

  // Минимальная и максимальная длина поля описания фотографии
  var onImageDescrInput = function (evt) {
    if (imageDescrField.value.length < formConstants.MIN_DESCR_LENGTH) {
      imageDescrField.setCustomValidity('Комментарий должен содержать не менее 30 символов. Текущее количество : ' + imageDescrField.value.length);
    } else if (imageDescrField.value.length > formConstants.MAX_DESCR_LENGTH) {
      imageDescrField.setCustomValidity('Комментарий должен содержать не более 100 символов. Текущее количество : ' + imageDescrField.value.length);
    } else {
      imageDescrField.setCustomValidity('');
    }
  };

  // Проверка правильности заполнения поля хэш-тегов
  var onImageHashtagsInput = function () {
    var hashtagsValue = imageHashtagsField.value.trim();
    var hashtagsList = hashtagsValue.split(' ');
    imageHashtagsField.setCustomValidity('');
    if (hashtagsList.length > formConstants.MAX_HASHTAGS_AMOUNT) {
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
        } else if (hashtagsList[i + 1] && hashtagsList[i] === hashtagsList[i + 1]) {
          imageHashtagsField.setCustomValidity('Хэш-теги не должны повторяться!');
        }
      }
    }
  };

// Выбор фильтра
  var currentEffect = null;
  var onEffectPreviewClick = function (evt) {

    if (evt.target.tagName === 'INPUT') {
      var effectName = evt.target.value;
      uploadImageEffects.classList.remove(currentEffect);
      currentEffect = 'effect-' + effectName;
      uploadImageEffects.classList.add(currentEffect);
    }
  };

  var onSubmitFormClick = function (fieldName) {
    fieldName.style.border = !fieldName.validity.valid ? '2px solid red' : 'none';
  };

  // Открывает форму кадрирования после загрузки фото
  uploadFile.addEventListener('change', openUploadForm);
  // Закрывает форму кадрировании при клике по крестику
  uploadFormClose.addEventListener('click', closeUploadForm);
  // Закрывает форму кадрирования на Enter, когда крестик в фокусе
  uploadFormClose.addEventListener('keydown', onUploadFormCloseEnterPress);
  // Увеличивает изображение на 25%
  resizeControlInc.addEventListener('click', function () {
    getResizeValue(1);
  });
// Уменьшает изображение на 25%
  resizeControlDec.addEventListener('click', function () {
    getResizeValue(-1);
  });
// Минимальное и максимальное значение символов в поле описания фотографии
  imageDescrField.addEventListener('input', onImageDescrInput);
// Проверка валидности поля хэш-тегов
  imageHashtagsField.addEventListener('input', onImageHashtagsInput);
// Выбор фильтра при клике
  uploadEffectsControls.addEventListener('click', onEffectPreviewClick);
// Подсвечивание невалидных полей красной рамкой
  uploadSubmitForm.addEventListener('click', function () {
    onSubmitFormClick(imageHashtagsField);
    onSubmitFormClick(imageDescrField);
  });
})();

// КОД РАБОТЫ С ПОЛЗУНКОМ
var pinHandle = document.querySelector('.upload-effect-level-pin');
var pinLine = document.querySelector('.upload-effect-level-line');

pinHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.ClientX,
      y: startCoords.y - moveEvt.ClientY
    };

    startCoords = {
      x: moveEvt.ClientX,
      y: moveEvt.ClientY
    };

    pinHandle.style.top = (pinHandle.offsetTop - shift.y) + 'px';
    pinHandle.style.top = (pinHandle.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    pinLine.addEventListener('mousemove', onMouseMove);
    pinLine.addEventListener('mouseup', onMouseUp);
  };

  pinLine.addEventListener('mousemove', onMouseMove);
  pinLine.addEventListener('mouseup', onMouseUp);
});