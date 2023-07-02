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

//Генератор случайных чисел
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
//Рандомный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
//Счётчик аватарок
const avatarCount = {
  MIN: 1,
  MAX: 6
};

const likesCount = {
  MIN: 15,
  MAX: 200
};

const commentsCount = {
  MIN: 0,
  MAX: 30
};

const photosCount = 25;
//Генератор аватарки
const getRandomUserAvatar = () => `img/avatar-${getRandomInteger(avatarCount.MIN, avatarCount.MAX)}.svg`;
//Генератор ID фотографий
const getRandomPhotoId = () => getRandomInteger(30, 199);
//Генератор URL фотографий
const getRandomPhotoUrl = () => `photos/${getRandomInteger(1, 25)}.jpg`;
//Генератор лайков
const getRandomLikes = () => getRandomInteger(likesCount.MIN, likesCount.MAX);

//Комментарий к фото
const getUserComment = function() {
  return {
    id: getRandomPhotoId(),
    avatar: getRandomUserAvatar(),
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES),
  };
};

//Карточка фотографии
const generatePhoto = function() {
  return {
    id: getRandomPhotoId(),
    url: getRandomPhotoUrl(),
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomLikes(),
    comments: Array.from({length: getRandomInteger(commentsCount.MIN, commentsCount.MAX)}, getUserComment),
  };
};

//Массив из 25 сгенерированных объектов
const photos = Array.from({length: photosCount}, generatePhoto);
// eslint-disable-next-line no-console
console.log(photos);
