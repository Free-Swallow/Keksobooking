import {controlModalState, StateWords, addModalListener} from './util.js';
import {manageScaleToggle, resetLogicForm} from './image-editing.js';
const uploadInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = uploadOverlay.querySelector('.img-upload__cancel');
const imgUpload = document.querySelector('.img-upload');
const hashTagInput = imgUpload.querySelector('.text__hashtags');
const commentArea = imgUpload.querySelector('.text__description');
const imageChooser = imgUpload.querySelector('.img-upload__input');
const inputFilterList = imgUpload.querySelector('.effects__list').children;
const preview = imgUpload.querySelector('.img-upload__preview')
  .querySelector('IMG');
const addModal = () => {
  controlModalState(uploadOverlay, StateWords.ADD);
  manageScaleToggle();
};
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const removeModalUploadPicture = () => controlModalState(uploadOverlay, StateWords.REMOVE);

const resetInput = () => {
  uploadInput.value = '';
  hashTagInput.value = '';
  commentArea.value = '';
  resetLogicForm();
};

const closeAndResetModal = () => {
  resetInput();
  removeModalUploadPicture();
};

const changeUploadFile = () => {
  uploadInput.addEventListener('change', () => {
    addModalListener(addModal, removeModalUploadPicture, closeButton, resetInput);
  });
};

imageChooser.addEventListener('change', () => {
  const file = imageChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);

    for (let i = 0; i <= inputFilterList.length; i++) {
      inputFilterList[i]
        .querySelector('SPAN')
        .style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
    }
  }
});

export {changeUploadFile, closeAndResetModal};
