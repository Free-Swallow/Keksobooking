import {getRandomPositiveInteger} from './util.js';

// Create Post
const DESCRIPTION_LIST = [
  'Сдави и омой дрожащую кость',
  'а я вам открыл столько стихов шкатулок',
  'Разместить анонс',
  'Илья Раманов',
  'Сообщество Поэзия Русского Мира',
  'Да и я не паломник!',
  'Утонет мир в котле июня',
  'У нее цветы, да мед',
];

const NAME_LIST = [
  'Артем',
  'Дима',
  'Антон',
  'Леха',
  'Стасян',
  'Игорь',
];

const MESSAGE_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const pur = () => (
  {
    id: getRandomPositiveInteger(0, 10000000000),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: MESSAGE_LIST[getRandomPositiveInteger(0, MESSAGE_LIST.length - 1)],
    name: NAME_LIST[getRandomPositiveInteger(0, NAME_LIST.length - 1)],
  }
);

const createPost = () => {
  let id = 1;

  return function () {
    const post = {
      id: id,
      url: `photos/${id}.jpg`,
      description: DESCRIPTION_LIST[getRandomPositiveInteger(0, DESCRIPTION_LIST.length - 1)],
      likes: getRandomPositiveInteger(15, 200),
      comments: Array.from({length: 15}, pur),
    };

    id++;

    return post;
  };
};

const getPost = createPost();

const createPostList = Array.from({length: 25}, getPost);

export {createPostList};
