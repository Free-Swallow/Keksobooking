import {isCheckLength} from './util.js';
import {createPicture} from './picture.js';
import {createPostList} from './mock.js';

const picturesListNode = document.querySelector('.pictures');

const renderPicture = (pictureList) => {
  const fragment = document.createDocumentFragment();

  pictureList.forEach((item) => fragment.appendChild(createPicture(item)));

  picturesListNode.appendChild(fragment);
};

renderPicture(createPostList);

isCheckLength('251');
