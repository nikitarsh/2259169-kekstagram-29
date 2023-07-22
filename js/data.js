import {getRandomArrayElement, getRandomInteger} from './util.js';

const NAMES = [
  'Регина',
  'София',
  'Варвара',
  'Вероника',
  'Роберт',
  'Алиса',
  'Владислав',
  'Артём',
  'Тимофей',
  'Леонид',
  'Георгий',
];

const COMMENTS = [
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота.',
  'Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.',
  'С ума сойти можно от того, как развивается этот мир, еще несколько лет назад было немыслимо представить, что такое будет абсолютно бесплатно, и так доступно.',
];

const DESCRIPTIONS = [
  'Улыбаюсь новому дню.',
  'Теплые воспоминания в холодное время года.',
  'Поймал дзен.',
  'I will survive или утро, после вечеринки.',
  'Я на стиле. Как вам?',
  'Это взрыв вкусовых рецепторов!',
];

const PHOTOS_COUNT = 25;

const AvatarCount = {
  MIN: 1,
  MAX: 6
};

const LikesCount = {
  MIN: 15,
  MAX: 200
};

const CommentsCount = {
  MIN: 0,
  MAX: 30
};

//Генератор аватарки
const getRandomUserAvatar = () => `img/avatar-${getRandomInteger(AvatarCount.MIN, AvatarCount.MAX)}.svg`;
//Генератор ID фотографий
const getRandomPhotoId = () => getRandomInteger(30, 199);
//Генератор лайков
const getRandomLikes = () => getRandomInteger(LikesCount.MIN, LikesCount.MAX);
//Комментарий к фото
const getUserComment = () => ({
  id: getRandomPhotoId(),
  avatar: getRandomUserAvatar(),
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES),
});
//Карточка фотографии
const generatePhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomLikes(),
  comments: Array.from({length: getRandomInteger(CommentsCount.MIN, CommentsCount.MAX)}, getUserComment),
});
//Массив из 25 сгенерированных объектов
const printPhotos = () => Array.from({length: PHOTOS_COUNT}, (_, i) => generatePhoto(i + 1));

export {printPhotos};
