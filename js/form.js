'use strict';

(function () {
  var formConstants = {
    MIN_RESIZE_VALUE: 25,
    MAX_RESIZE_VALUE: 100,
    RESIZE_VALUE_STEP: 25,
    MAX_DESCR_LENGTH: 140,
    MAX_HASHTAGS_AMOUNT: 5
  };

  var scaleConstants = {
    MIN_RESIZE_VALUE: 25,
    MAX_RESIZE_VALUE: 100,
    RESIZE_VALUE_STEP: 25
  };

  var pinValues = {
    MIN_PIN_POSITION: 0,
    MAX_PIN_POSITION: 455,
    DEFAULT_PIN_POSITION: 455 * 0.20
  };

  var filtersConstants = {
    CHROME: 'effect-chrome',
    SEPIA: 'effect-sepia',
    MARVIN: 'effect-marvin',
    PHOBOS: 'effect-phobos',
    HEAT: 'effect-heat'
  };

  var uploadForm = document.querySelector('#upload-select-image');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
  var uploadImage = uploadForm.querySelector('.upload-image');
  var uploadFormClose = uploadForm.querySelector('.upload-form-cancel');
  var uploadImageEffect = uploadOverlay.querySelector('.effect-image-preview');
  var imageDescribeField = uploadOverlay.querySelector('.upload-form-description');
  var imageHashtagsField = uploadOverlay.querySelector('.upload-form-hashtags');
  var uploadSubmitForm = uploadOverlay.querySelector('.upload-form-submit');
  var pinHandle = document.querySelector('.upload-effect-level-pin');
  var pinValue = document.querySelector('.upload-effect-level-val');
  var uploadEffectLevel = uploadOverlay.querySelector('.upload-effect-level');
  var resizeControlsValue = document.querySelector('.upload-resize-controls-value');
  var uploadEffectNone = uploadOverlay.querySelector('#upload-effect-none');

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
    window.error.hide();
    uploadFile.value = '';
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
  var onImageDescribeInput = function (evt) {
    imageDescribeField.setCustomValidity('');
    if (imageDescribeField.value.length > formConstants.MAX_DESCR_LENGTH) {
      imageDescribeField.setCustomValidity('Комментарий должен содержать не более 140 символов. Текущая длина: ' + imageDescribeField.value.length);
    }
  };

  // Атрибут accept не поддерживается Edge. Проверка типа файла есть на сервере. Для предупреждения пользователя мы выводим errorMesage
  // Проверка правильности заполнения поля хэш-тегов
  var onImageHashtagsInput = function () {
    var hashtagsValue = imageHashtagsField.value.trim();
    var hashtagsList = hashtagsValue.split(' ');
    imageHashtagsField.setCustomValidity('');
    if (hashtagsList.length > formConstants.MAX_HASHTAGS_AMOUNT) {
      imageHashtagsField.setCustomValidity('Количество хэш-тегов не может быть больше 5');
    } else if (imageHashtagsField.value !== '') {
      hashtagsList.sort();
      hashtagsList.forEach(function (currentHashtag, index, hashtags) {
        if (currentHashtag.charAt(0) !== '#') {
          imageHashtagsField.setCustomValidity('Хэш-теги должны начинаться со знака решетки (#)');
        } else if (currentHashtag.indexOf('#', 2) > 0) {
          imageHashtagsField.setCustomValidity('Хэш-теги должны разделяться пробелом');
        } else if (currentHashtag.length > 20) {
          imageHashtagsField.setCustomValidity('Название хэш-тегов не может превышать 20 символов');
        } else if (hashtags[index + 1] && currentHashtag === hashtags[index + 1]) {
          imageHashtagsField.setCustomValidity('Хэш-теги не должны повторяться!');
        }
      });
    }
  };

  // Увеличение-уменьшение элемента
  var resizeValue = function (scaleElement, pictureElement, valueDirection) {
    var defaultResizeValue = parseInt(scaleElement.getAttribute('value'), 10);
    var newResizeValue = defaultResizeValue + (scaleConstants.RESIZE_VALUE_STEP * valueDirection);
    if (newResizeValue >= scaleConstants.MIN_RESIZE_VALUE && newResizeValue <= scaleConstants.MAX_RESIZE_VALUE) {
      scaleElement.setAttribute('value', newResizeValue + '%');
      pictureElement.style.transform = 'scale(' + newResizeValue / 100 + ')';
    }
  };

  // Подсвечивает невалидные поля красной рамкой
  var onSubmitFormClick = function (fieldName) {
    fieldName.style.border = !fieldName.validity.valid ? '2px solid red' : 'none';
  };

  // Изменяет значение текущего фильтра
  var setFilterValue = function (value, pictureElement) {
    switch (currentEffect) {
      case filtersConstants.CHROME:
        pictureElement.style.filter = 'grayscale(' + value / pinValues.MAX_PIN_POSITION + ')';
        break;
      case filtersConstants.SEPIA:
        pictureElement.style.filter = 'sepia(' + value / pinValues.MAX_PIN_POSITION + ')';
        break;
      case filtersConstants.MARVIN:
        pictureElement.style.filter = 'invert(' + Math.floor((value) * 100 / pinValues.MAX_PIN_POSITION) + '%)';
        break;
      case filtersConstants.PHOBOS:
        pictureElement.style.filter = 'blur(' + value * 3 / pinValues.MAX_PIN_POSITION + 'px)';
        break;
      case filtersConstants.HEAT:
        pictureElement.style.filter = 'brightness(' + value * 3 / pinValues.MAX_PIN_POSITION + ')';
        break;
      default:
        pictureElement.style.filter = 'none';
    }
  };

  // Изменяет  текущий фильтр
  uploadEffectLevel.classList.add('hidden');
  var currentEffect = null;
  var onEffectPreviewClick = function (evt, pictureElement, effectLevel) {
    if (evt.target.tagName === 'INPUT') {
      var effectName = evt.target.value;
      uploadImageEffect.classList.remove(currentEffect);
      currentEffect = 'effect-' + effectName;
      pictureElement.classList.add(currentEffect);
      pinHandle.style.left = pinValues.DEFAULT_PIN_POSITION + 'px';
      pinValue.style.width = pinHandle.style.left;
      if (currentEffect !== 'effect-none') {
        effectLevel.classList.remove('hidden');
      } else {
        effectLevel.classList.add('hidden');
      }
      setFilterValue(pinValues.DEFAULT_PIN_POSITION, pictureElement);
    }
  };

  // Сбрасывает поля формы по умолчанию
  var resetForm = function () {
    imageHashtagsField.value = '';
    imageDescribeField.value = '';
    resizeControlsValue.setAttribute('value', '100%');
    uploadImageEffect.className = 'effect-image-preview';
    uploadImageEffect.style.filter = 'none';
    uploadImageEffect.style.transform = 'scale(1)';
    pinHandle.style.left = pinValues.DEFAULT_PIN_POSITION + 'px';
    uploadEffectNone.checked = true;
    uploadFile.value = '';
  };

  // Вспомогательная функция. Закрывает и сбрасывает поля формы
  var closeAndResetForm = function () {
    closeUploadForm();
    resetForm();
  };

  // Отправка данных на сервер при отправке формы, ее сброс и закрытие, всплытие сообщения об ошибке, если таковая имеется
  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(uploadForm), closeAndResetForm, window.error.show);
  });

  // Увеличивает-уменьшает изображение перед публикацией (scale)
  window.initializeScale(resizeValue, 1, -1);

  // Изменяет текущий фильтр
  window.initializeFilters(onEffectPreviewClick);

  // Открывает форму кадрирования после загрузки фото
  uploadFile.addEventListener('change', openUploadForm);

  // Закрывает форму кадрировании при клике по крестику
  uploadFormClose.addEventListener('click', closeUploadForm);

  // Закрывает форму кадрирования на Enter, когда крестик в фокусе
  uploadFormClose.addEventListener('keydown', onUploadFormCloseEnterPress);

  // Минимальное и максимальное значение символов в поле описания фотографии
  imageDescribeField.addEventListener('input', onImageDescribeInput);

  // Проверка валидности поля хэш-тегов
  imageHashtagsField.addEventListener('input', onImageHashtagsInput);

  // Подсвечивание невалидных полей красной рамкой
  uploadSubmitForm.addEventListener('click', function () {
    onSubmitFormClick(imageHashtagsField);
    onSubmitFormClick(imageDescribeField);
  });

  // КОД РАБОТЫ С ПОЛЗУНКОМ
  pinHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoord = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = startCoord - moveEvt.clientX;
      startCoord = moveEvt.clientX;
      var scaleValue = pinHandle.offsetLeft - shift;
      if (scaleValue <= pinValues.MIN_PIN_POSITION) {
        pinHandle.style.left = pinValues.MIN_PIN_POSITION + 'px';
      } else if (pinHandle.offsetLeft - shift >= pinValues.MAX_PIN_POSITION) {
        pinHandle.style.left = pinValues.MAX_PIN_POSITION + 'px';
      } else {
        pinHandle.style.left = (scaleValue) + 'px';
      }
      pinValue.style.width = pinHandle.style.left;
      setFilterValue(scaleValue, uploadImageEffect);
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
