const picturesListNode = document.querySelector('.pictures');
const filterNode = document.querySelector('.img-filters');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderCards = (list) => {
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
    filterNode.classList.remove('img-filters--inactive');
  });

  picturesListNode.querySelectorAll('.picture')
    .forEach((item) => item.remove());

  picturesListNode.appendChild(fragment);
};

export {renderCards};
