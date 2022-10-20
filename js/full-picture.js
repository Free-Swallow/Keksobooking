const bigPictureTemplate = document.querySelector('.big-picture');
const bigPictureImg = bigPictureTemplate.querySelector('.big-picture__img')
  .querySelector('img');
const bigPictureLikeCount = bigPictureTemplate.querySelector('.likes-count');
const bigPictureCommentCount = bigPictureTemplate.querySelector('.comments-count');
const bigPictureCommentList = bigPictureTemplate.querySelector('.social__comments');
const bigPictureMessage = bigPictureTemplate.querySelector('.social__caption');
const commentTemplate = bigPictureTemplate.querySelector('.social__comment');
const cancelButton = bigPictureTemplate.querySelector('.big-picture__cancel');
const TOGGLES_CLASS = 'hidden';
// const STEP_SHOW_COMMENT = 5;
const KeysClose = {
  ESC: 'Escape'
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

  function closePictureHandle() {
    closePicture();
  }

  function closeKeyPictureHandle(evt) {
    if (evt.key === KeysClose.ESC) {
      evt.preventDefault();
      closePicture();

    }
  }

  function closePicture() {
    bigPictureTemplate.classList.add(TOGGLES_CLASS);
    document.body.classList.remove('modal-open');
    cancelButton.removeEventListener('click', closePictureHandle);
    document.removeEventListener('keydown', closeKeyPictureHandle);
  }

  cancelButton.addEventListener('click', closePictureHandle);
  document.addEventListener('keydown', closeKeyPictureHandle);
  document.body.classList.add('modal-open');

  bigPictureTemplate.classList.remove(TOGGLES_CLASS);
};

export {showBigPicture};
