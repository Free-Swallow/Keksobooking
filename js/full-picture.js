import {controlModalState, StateWords, addModalListener, ClassList, findCard} from './util.js';
const bigPictureTemplate = document.querySelector('.big-picture');
const bigPictureImg = bigPictureTemplate.querySelector('.big-picture__img')
  .querySelector('img');
const bigPictureLikeCount = bigPictureTemplate.querySelector('.likes-count');
const bigPictureCommentList = bigPictureTemplate.querySelector('.social__comments');
const bigPictureMessage = bigPictureTemplate.querySelector('.social__caption');
const commentTemplate = bigPictureTemplate.querySelector('.social__comment');
const cancelButton = bigPictureTemplate.querySelector('.big-picture__cancel');
const commentLoadButton = bigPictureTemplate.querySelector('.comments-loader');
const commentCounter = bigPictureTemplate.querySelector('.social__comment-count');
const picturesListNode = document.querySelector('.pictures');
const addModal = () => controlModalState(bigPictureTemplate, StateWords.ADD);
const removeModal = () => controlModalState(bigPictureTemplate, StateWords.REMOVE);
const STEP_SHOW_COMMENT = 5;

// Отрисовка списка комментариев
const renderCommentList = (list) => {
  const commentList = document.createDocumentFragment();
  list.forEach((item) => {
    const comment = commentTemplate.cloneNode(true);
    const commentImg = comment.querySelector('.social__picture');
    const commentText = comment.querySelector('.social__text');

    commentImg.src = item.avatar;
    commentImg.alt = item.name;
    commentText.textContent = item.message;

    bigPictureCommentList.appendChild(comment);
  });

  return commentList;
};

// Обработчик рендера дополнительных комментариев
const increaseCommentCount = (list) => {
  const addComment = list.slice(
    bigPictureCommentList.children.length,
    bigPictureCommentList.children.length + STEP_SHOW_COMMENT
  );

  const renderAddComment = () => renderCommentList(addComment);

  bigPictureCommentList.appendChild(renderAddComment());
  commentCounter.textContent = `${bigPictureCommentList.children.length} из ${list.length} комментариев`;

  if (bigPictureCommentList.children.length >= list.length) {
    commentLoadButton.classList.add(ClassList.HIDDEN_CLASS);
  }
};

const showBigPicture = ({url, likes, comments, description}) => {
  bigPictureCommentList.innerHTML = '';

  const copyCommentList = comments.slice(0, STEP_SHOW_COMMENT);
  const startPictureList = renderCommentList(copyCommentList);
  const increaseCommentCountHandler = () => increaseCommentCount(comments);

  // Сброс формы
  const resetModal = () => {
    bigPictureImg.src = '';
    bigPictureLikeCount.textContent = '';
    commentCounter.textContent = '';
    bigPictureMessage.textContent = '';
    commentLoadButton.classList.remove(ClassList.HIDDEN_CLASS);
    commentLoadButton.removeEventListener('click', increaseCommentCountHandler);
  };

  bigPictureImg.src = url;
  bigPictureLikeCount.textContent = likes;
  bigPictureMessage.textContent = description;

  bigPictureCommentList.appendChild(startPictureList);
  commentCounter.textContent = `${bigPictureCommentList.children.length} из ${comments.length} комментариев`;

  if (bigPictureCommentList.children.length === comments.length) {
    commentLoadButton.classList.add(ClassList.HIDDEN_CLASS);
  }

  addModalListener(addModal, removeModal, cancelButton, resetModal);
  commentLoadButton.addEventListener('click', increaseCommentCountHandler);
};

const renderFullPicture = (data) => {
  picturesListNode.addEventListener('click', (evt) => {
    if (evt.target.nodeName === 'IMG') {
      showBigPicture(findCard(evt, data));
    }
  });
};

export {renderFullPicture};
