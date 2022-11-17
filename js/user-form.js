import {isCheckLength} from './util.js';
import {renderSuccessMessage, renderErrorMessage} from './message.js';

const imgUpload = document.querySelector('.img-upload');
const hashTagInput = imgUpload.querySelector('.text__hashtags');
const commentArea = imgUpload.querySelector('.text__description');
const userForm = document.querySelector('.img-upload__form');

const RequirementsHashTags = {
  HASHTAG_REGEX: /^#[A-Za-zА-Яа-я0-9]{1,19}$/,
  MAX_LENGTH: 20,
  MAX_COUNT: 5,
};

const MAX_LENGTH_COMMENT = 140;

// Валидация хештегов

const checkHashTagsHandle = () => {
  const hashTagsList = hashTagInput
    .value
    .toLowerCase()
    .trim()
    .split(' ');
  const uniqueHashTags = new Set(hashTagsList);

  if (!hashTagInput.value) {
    hashTagInput
      .setCustomValidity('');

    return false;
  }

  // Валидация на регуляр.выражение
  for (const tag of hashTagsList) {
    if (!RequirementsHashTags.HASHTAG_REGEX.test(tag)) {
      hashTagInput
        .setCustomValidity('Хештег должен начинаться со знака #, содержать только Кириллицу и Латиницу, ' +
          'или числа от 0 до 9');

      return false;
    }
  }

  // Валидация на уникальность хештега
  if (uniqueHashTags.size !== hashTagsList.length) {
    hashTagInput
      .setCustomValidity('Все хештеги должны быть уникальными');

    return false;
  }

  // Валидация на кол. хештегов
  if (hashTagsList.length > RequirementsHashTags.MAX_COUNT) {
    hashTagInput
      .setCustomValidity(`Количество хештегов не должно превышать ${RequirementsHashTags.MAX_COUNT}`);

    return false;
  }

  hashTagInput.setCustomValidity('');
  hashTagInput.reportValidity();
};

// Валидация комментариев

const checkCommentHandler = () => {
  if (!commentArea.value) {
    commentArea.setCustomValidity('');

    return false;
  }

  if (!isCheckLength(commentArea.value, MAX_LENGTH_COMMENT)) {
    commentArea.setCustomValidity(`Длинна сообщения не должна превышать ${MAX_LENGTH_COMMENT} символов`);

    return false;
  }

  commentArea.setCustomValidity('');
  commentArea.reportValidity();
};

const setUserFormSubmit = (onSuccess) => {
  userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch('https://24.javascript.pages.academy/kekstagram', {
      method: 'POST',
      body: formData,
    },
    )
      .then((response) => {
        if (response.ok) {
          onSuccess();
          renderSuccessMessage();
        } else {
          renderErrorMessage();
        }
      })
      .catch(() => renderErrorMessage());
  });
};

hashTagInput.addEventListener('change', checkHashTagsHandle);
commentArea.addEventListener('change', checkCommentHandler);

export {checkHashTagsHandle, setUserFormSubmit};
