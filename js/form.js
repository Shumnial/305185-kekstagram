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

  var pinValues = {
    MIN_PIN_POSITION: 0,
    MAX_PIN_POSITION: 455,
    DEFAULT_PIN_POSITION: 20 + '%'
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
      // Значения фильтра и ползунка по умолчанию
      pinHandle.style.left = pinValues.DEFAULT_PIN_POSITION;
      pinValue.style.width = pinValues.DEFAULT_PIN_POSITION;
      switch (currentEffect) {
        case 'effect-chrome':
          uploadImageEffects.style.filter = 'grayscale(0.2)';
          break;
        case 'effect-sepia':
          uploadImageEffects.style.filter = 'sepia(0.2)';
          break;
        case 'effect-marvin':
          uploadImageEffects.style.filter = 'invert(20%)';
          break;
        case 'effect-phobos':
          uploadImageEffects.style.filter = 'blur(0.6px)';
          break;
        case 'effect-heat':
          uploadImageEffects.style.filter = 'brightness(0.6)';
          break;
        default:
          uploadImageEffects.style.filter = 'none';
      }
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

  // КОД РАБОТЫ С ПОЛЗУНКОМ
  var pinHandle = document.querySelector('.upload-effect-level-pin');
  var pinValue = document.querySelector('.upload-effect-level-val');

  pinHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoord = evt.clientX;

    var scaleValue = null;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoord - moveEvt.clientX;

      startCoord = moveEvt.clientX;

      scaleValue = pinHandle.offsetLeft - shift;

      if (pinHandle.offsetLeft - shift <= pinValues.MIN_PIN_POSITION) {
        pinHandle.style.left = pinValues.MIN_PIN_POSITION + 'px';
        pinValue.style.width = pinValues.MIN_PIN_POSITION + 'px';
      } else if (pinHandle.offsetLeft - shift >= pinValues.MAX_PIN_POSITION) {
        pinHandle.style.left = pinValues.MAX_PIN_POSITION + 'px';
        pinValue.style.width = pinValues.MAX_PIN_POSITION + 'px';
      } else {
        pinHandle.style.left = (scaleValue) + 'px';
        pinValue.style.width = (scaleValue) + 'px';
      }

      switch (currentEffect) {
        case 'effect-chrome':
          uploadImageEffects.style.filter = 'grayscale(' + (scaleValue) / pinValues.MAX_PIN_POSITION + ')';
          break;
        case 'effect-sepia':
          uploadImageEffects.style.filter = 'sepia(' + (scaleValue) / pinValues.MAX_PIN_POSITION + ')';
          break;
        case 'effect-marvin':
          uploadImageEffects.style.filter = 'invert(' + Math.floor((scaleValue) * 100 / pinValues.MAX_PIN_POSITION) + '%)';
          break;
        case 'effect-phobos':
          uploadImageEffects.style.filter = 'blur(' + (scaleValue) * 3 / pinValues.MAX_PIN_POSITION + 'px)';
          break;
        case 'effect-heat':
          uploadImageEffects.style.filter = 'brightness(' + (scaleValue) * 3 / pinValues.MAX_PIN_POSITION + ')';
          break;
        default:
          uploadImageEffects.style.filter = 'none';
      }
        /* if (uploadImageEffects.classList.contains('effect-chrome')) {
          uploadImageEffects.style.filter = 'grayscale(' + (currentPosition) / pinValues.MAX_PIN_POSITION + ')';
        } else if (uploadImageEffects.classList.contains('effect-sepia')) {
          uploadImageEffects.style.filter = 'sepia(' + (currentPosition) / pinValues.MAX_PIN_POSITION + ')';
        } else if (uploadImageEffects.classList.contains('effect-marvin')) {
          uploadImageEffects.style.filter = 'invert(' + Math.floor((currentPosition) * 100 / pinValues.MAX_PIN_POSITION) + '%)';
        } else if (uploadImageEffects.classList.contains('effect-phobos')) {
          uploadImageEffects.style.filter = 'blur(' + (currentPosition) * 3 / pinValues.MAX_PIN_POSITION + 'px)';
        } else if (uploadImageEffects.classList.contains('effect-heat')) {
          uploadImageEffects.style.filter = 'brightness(' + (currentPosition) * 3 / pinValues.MAX_PIN_POSITION + ')';
        } */
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
