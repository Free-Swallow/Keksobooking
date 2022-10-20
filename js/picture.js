import {showBigPicture} from './full-picture.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPicture = (pic) => {
  const {url, likes, comments} = pic;
  const picture = pictureTemplate.cloneNode(true);
  const showBigPictureHandle = () => showBigPicture(pic);
  const pictureImg = picture.querySelector('.picture__img');
  pictureImg.src = url;
  const pictureCommentCount = picture.querySelector('.picture__comments');
  pictureCommentCount.textContent = comments.length;
  const pictureLikesCount = picture.querySelector('.picture__likes');
  pictureLikesCount.textContent = likes;

  picture.addEventListener('click', showBigPictureHandle);

  return picture;
};

export {createPicture};
