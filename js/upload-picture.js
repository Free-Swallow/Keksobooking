import {controlModalState, StateWords, addModalListener} from './util.js';
const uploadInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = uploadOverlay.querySelector('.img-upload__cancel');
const addModal = () => controlModalState(uploadOverlay, StateWords.ADD);
const removeModal = () => controlModalState(uploadOverlay, StateWords.REMOVE);

const resetInput = () => (uploadInput.value = '');

const changeUploadFile = () => {
  uploadInput.addEventListener('change', () => {
    addModalListener(addModal, removeModal, closeButton, resetInput);
  });
};

export {changeUploadFile};
