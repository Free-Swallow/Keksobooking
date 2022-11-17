import {controlModalState, StateWords, addModalListener} from './util.js';
import {manageScaleToggle, resetLogicForm} from './image-editing.js';
const uploadInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = uploadOverlay.querySelector('.img-upload__cancel');
const imgUpload = document.querySelector('.img-upload');
const hashTagInput = imgUpload.querySelector('.text__hashtags');
const commentArea = imgUpload.querySelector('.text__description');
const addModal = () => {
  controlModalState(uploadOverlay, StateWords.ADD);
  manageScaleToggle();
};
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

export {changeUploadFile, closeAndResetModal};
