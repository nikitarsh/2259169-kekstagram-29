const pictureElement = document.querySelector('.big-picture');
const pictureCloseButton = pictureElement.querySelector('.big-picture__cancel');
const socialCommentsCount = pictureElement.querySelector('.social__comment-count');
const body = document.querySelector('body');
const socialCommentsLoader = pictureElement.querySelector('.comments-loader');
const socialCommentsList = pictureElement.querySelector('.social__comments');
const commentElement = document.querySelector('#comment').content.querySelector('.social__comment');
//Создание одного комментария
const createComment = ({avatar, message, name}) => {
  const comment = commentElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};
//Создание рандомных комментариев в модальном окне, под большим фото.
const renderComments = (comments) => {
  socialCommentsList.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });

  socialCommentsList.append(fragment);
};

//Скрытие модалки
const hideBigImage = () => {
  pictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigImage();
  }
}

const onPictureCloseButton = () => {
  hideBigImage();
};
//Поиск данных для лайков, описания
const renderImageDetails = ({url, likes, description}) => {
  pictureElement.querySelector('.big-picture__img img').src = url;
  pictureElement.querySelector('.big-picture__img img').alt = description;
  pictureElement.querySelector('.likes-count').textContent = likes;
  pictureElement.querySelector('.social__caption').textContent = description;
};
//Открытие модалки
const openBigImage = (data) => {
  pictureElement.classList.remove('hidden');
  body.classList.add('modal-open');
  socialCommentsLoader.classList.add('hidden');
  socialCommentsCount.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderImageDetails(data);
  renderComments(data.comments);
};
//отработчик для закрытия модалки по клику на крестик.
pictureCloseButton.addEventListener('click', onPictureCloseButton);

export { openBigImage };
