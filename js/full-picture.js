import {controlModalState, StateWords, addModalListener} from './util.js';
const bigPictureTemplate = document.querySelector('.big-picture');
const bigPictureImg = bigPictureTemplate.querySelector('.big-picture__img')
  .querySelector('img');
const bigPictureLikeCount = bigPictureTemplate.querySelector('.likes-count');
const bigPictureCommentCount = bigPictureTemplate.querySelector('.comments-count');
const bigPictureCommentList = bigPictureTemplate.querySelector('.social__comments');
const bigPictureMessage = bigPictureTemplate.querySelector('.social__caption');
const commentTemplate = bigPictureTemplate.querySelector('.social__comment');
const cancelButton = bigPictureTemplate.querySelector('.big-picture__cancel');
const addModal = () => controlModalState(bigPictureTemplate, StateWords.ADD);
const removeModal = () => controlModalState(bigPictureTemplate, StateWords.REMOVE);
// const STEP_SHOW_COMMENT = 5;

const resetModal = () => {
  bigPictureImg.src = '';
  bigPictureLikeCount.textContent = '';
  bigPictureCommentCount.textContent = '';
  bigPictureMessage.textContent = '';

  bigPictureCommentList.innerHTML = '';
};

const showBigPicture = ({url, likes, comments, description}) => {
  const commentCount = 4;
  bigPictureImg.src = url;
  bigPictureLikeCount.textContent = likes;
  bigPictureCommentCount.textContent = comments.length;
  bigPictureMessage.textContent = description;

  bigPictureCommentList.innerHTML = '';

  for (let i = 0; i <= commentCount; i++) {
    const comment = commentTemplate.cloneNode(true);
    const commentImg = comment.querySelector('.social__picture');
    const commentText = comment.querySelector('.social__text');

    if (i === comments.length) {
      break;
    }

    commentImg.src = comments[i].avatar;
    commentImg.alt = comments[i].name;
    commentText.textContent = comments[i].message;

    bigPictureCommentList.appendChild(comment);
  }

  addModalListener(addModal, removeModal, cancelButton, resetModal);
};

export {showBigPicture};
