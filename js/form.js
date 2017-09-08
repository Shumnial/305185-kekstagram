'use strict';

(function () {
  var MIN_RESIZE_VALUE = 25;
  var MAX_RESIZE_VALUE = 100;
  var RESIZE_VALUE_STEP = 25;
  var MIN_DESCR_LENGTH = 30;
  var MAX_DESCR_LENGTH = 100;
  var MAX_HASHTAGS_AMOUNT = 5;

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
    window.utils.isEscEvent(evt, closeUploadForm);
  };

  // Закрывает форму кадрирования на Enter, когда крестик в фокусе
  var onUploadFormCloseEnterPress = function (evt) {
    window.utils.isEnterEvent(evt, closeUploadForm);
  };

  // Увеличение-уменьшение масштаба фото (scale)
  var getResizeValue = function (valueDirection) {
    var defaultResizeValue = parseInt(resizeControlsValue.getAttribute('value'), 10);
    var newResizeValue = defaultResizeValue + (RESIZE_VALUE_STEP * valueDirection);
    if (newResizeValue >= MIN_RESIZE_VALUE && newResizeValue <= MAX_RESIZE_VALUE) {
      resizeControlsValue.setAttribute('value', newResizeValue + '%');
      uploadImageEffects.style.transform = 'scale(' + newResizeValue / 100 + ')';
    }
  };

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
    var hashtagsValue = imageHashtagsField.value.trim();
    var hashtagsList = hashtagsValue.split(' ');
    imageHashtagsField.setCustomValidity('');
    if (hashtagsList.length > MAX_HASHTAGS_AMOUNT) {
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
    var fieldValidity = !fieldName.validity.valid
    ? fieldName.style.border = '2px solid red'
    : fieldName.style.border = 'none';
    return fieldValidity;
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
