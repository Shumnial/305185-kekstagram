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
    DEFAULT_PIN_POSITION: 455 * 0.20
  };

  var scaleConstants = {
    MIN_RESIZE_VALUE: 25,
    MAX_RESIZE_VALUE: 100,
    RESIZE_VALUE_STEP: 25
  };


  var uploadForm = document.querySelector('#upload-select-image');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
  var uploadImage = uploadForm.querySelector('.upload-image');
  var uploadFormClose = uploadForm.querySelector('.upload-form-cancel');
  var uploadImageEffects = uploadOverlay.querySelector('.effect-image-preview');
  var imageDescrField = uploadOverlay.querySelector('.upload-form-description');
  var imageHashtagsField = uploadOverlay.querySelector('.upload-form-hashtags');
  var uploadEffectsControls = uploadOverlay.querySelector('.upload-effect-controls');
  var uploadSubmitForm = uploadOverlay.querySelector('.upload-form-submit');
  var uploadEffectLevel = uploadOverlay.querySelector('.upload-effect-level');

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

  // Увеличение-уменьшение элемента
  var getResizeValue = function (scaleElement, pictureElement, valueDirection) {
    var defaultResizeValue = parseInt(scaleElement.getAttribute('value'), 10);
    var newResizeValue = defaultResizeValue + (scaleConstants.RESIZE_VALUE_STEP * valueDirection);
    if (newResizeValue >= scaleConstants.MIN_RESIZE_VALUE && newResizeValue <= scaleConstants.MAX_RESIZE_VALUE) {
      scaleElement.setAttribute('value', newResizeValue + '%');
      pictureElement.style.transform = 'scale(' + newResizeValue / 100 + ')';
    }
  };

  var onSubmitFormClick = function (fieldName) {
    fieldName.style.border = !fieldName.validity.valid ? '2px solid red' : 'none';
  };

  window.initializeScale(getResizeValue, 1, -1);
  // Открывает форму кадрирования после загрузки фото
  uploadFile.addEventListener('change', openUploadForm);
  // Закрывает форму кадрировании при клике по крестику
  uploadFormClose.addEventListener('click', closeUploadForm);
  // Закрывает форму кадрирования на Enter, когда крестик в фокусе
  uploadFormClose.addEventListener('keydown', onUploadFormCloseEnterPress);
// Минимальное и максимальное значение символов в поле описания фотографии
  imageDescrField.addEventListener('input', onImageDescrInput);
// Проверка валидности поля хэш-тегов
  imageHashtagsField.addEventListener('input', onImageHashtagsInput);
// Выбор фильтра при клике
  uploadEffectsControls.addEventListener('click', function (evt) {
    window.initializeFilters.onEffectPreviewClick(evt, uploadImageEffects, pinHandle, pinValue, uploadEffectLevel);
  });
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

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoord - moveEvt.clientX;

      startCoord = moveEvt.clientX;

      var scaleValue = pinHandle.offsetLeft - shift;

      if (pinHandle.offsetLeft - shift <= pinValues.MIN_PIN_POSITION) {
        pinHandle.style.left = pinValues.MIN_PIN_POSITION + 'px';
      } else if (pinHandle.offsetLeft - shift >= pinValues.MAX_PIN_POSITION) {
        pinHandle.style.left = pinValues.MAX_PIN_POSITION + 'px';
      } else {
        pinHandle.style.left = (scaleValue) + 'px';
      }
      pinValue.style.width = pinHandle.style.left;

      window.initializeFilters.getScaleValue(scaleValue, uploadImageEffects);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  uploadEffectLevel.classList.add('hidden');
})();
