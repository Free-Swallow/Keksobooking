const picturesListNode = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPicture = (list) => {
  const fragment = document.createDocumentFragment();

  list.forEach((item) => {
    const {url, likes, comments, id} = item;
    const picture = pictureTemplate.cloneNode(true);
    const pictureImg = picture.querySelector('.picture__img');
    const pictureCommentCount = picture.querySelector('.picture__comments');
    const pictureLikesCount = picture.querySelector('.picture__likes');

    pictureImg.src = url;
    pictureImg.id = id;
    pictureCommentCount.textContent = comments.length;
    pictureLikesCount.textContent = likes;

    fragment.appendChild(picture);
  });
  return fragment;
};

const renderCards = (data) => picturesListNode.appendChild(createPicture(data));

export {renderCards};
