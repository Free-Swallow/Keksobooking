import {controlModalState, StateWords, addModalListener} from './util.js';
import {manageScaleToggle, resetLogicForm} from './image-editing.js';
const uploadInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = uploadOverlay.querySelector('.img-upload__cancel');
const addModal = () => {
  controlModalState(uploadOverlay, StateWords.ADD);
  manageScaleToggle();
};
const removeModal = () => controlModalState(uploadOverlay, StateWords.REMOVE);

const resetInput = () => {
  uploadInput.value = '';
  resetLogicForm();
};

const changeUploadFile = () => {
  uploadInput.addEventListener('change', () => {
    addModalListener(addModal, removeModal, closeButton, resetInput);
  });
};

export {changeUploadFile};
