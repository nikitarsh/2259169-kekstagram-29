import { openBigImage } from './big-images.js';
//Находим шаблон из разметки.
const elementTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
//Создаем контейнер.
const container = document.querySelector('.pictures');
//Создаем одну миниатюру фотографии
const createImage = ({comments, description, likes, url, id }) => {
  const element = elementTemplate.cloneNode(true);

  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__img').alt = description;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__likes').textContent = likes;
  //Добавляем дата атрибут
  element.dataset.elementId = id;

  return element;
};

//Создаем минитюры фотографий.
const createImages = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const element = createImage(picture);
    //Добавляем открытие большого фото по клику на миниатюру.
    element.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigImage(picture);
    });
    fragment.append(element);
  });

  container.append(fragment);
};

export {createImages};
