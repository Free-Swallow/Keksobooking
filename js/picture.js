const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPicture = (pic) => {
  const {url, likes, comments, id} = pic;
  const picture = pictureTemplate.cloneNode(true);
  const pictureImg = picture.querySelector('.picture__img');
  const pictureCommentCount = picture.querySelector('.picture__comments');
  const pictureLikesCount = picture.querySelector('.picture__likes');

  pictureImg.src = url;
  pictureImg.id = id;
  pictureCommentCount.textContent = comments.length;
  pictureLikesCount.textContent = likes;

  return picture;
};

export {createPicture};
