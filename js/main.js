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

const PHOTO_DESCRIPTIONS = [
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

//Генератор аватарки
const getRandomUserAvatar = () => `img/avatar-${getRandomInteger(1, 6)}.svg`;
getRandomUserAvatar();
//Генерратор комментариев
const getRandomComment = () => COMMENTS[getRandomInteger(0, COMMENTS.length -1)];
//Генератор описания фотографий
const getRandomPhotoDescription = () => PHOTO_DESCRIPTIONS[getRandomInteger(0, PHOTO_DESCRIPTIONS.length -1)];
//Генератор ID фотографий
const getRandomPhotoId = () => getRandomInteger(30, 199);
//Генератор URL фотографий
const getRandomPhotoUrl = () => `photos/${getRandomInteger(1, 25)}.jpg`;
//Генератор лайков
const getRandomLikes = () => getRandomInteger(15, 200);

//Комментарий к фото
const getUserComment = () => {
  return {
    id: getRandomPhotoId(),
    avatar: getRandomUserAvatar(),
    message: getRandomComment(),
    name: NAMES[getRandomInteger(0, NAMES.length -1)],
  };
};

//Карточка фотографии
const generatePhotoPage = () => {
  return {
    id: getRandomPhotoId(),
    url: getRandomPhotoUrl(),
    description: getRandomPhotoDescription(),
    likes: getRandomLikes(),
    comments: Array.from({length: getRandomInteger(0, 30)}, getUserComment),
  };
};

//Массив из 25 сгенерированных объектов
let photosUsersDescriptions = Array.from({length: 25}, generatePhotoPage);
// eslint-disable-next-line no-console
console.log(photosUsersDescriptions);
