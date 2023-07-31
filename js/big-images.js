//Количество комментариев под фото.
const COMMENTS_PER_PAGE = 5;

const pictureElement = document.querySelector('.big-picture');
const commentsCount = document.querySelector('.comments-count');
const pictureCloseButton = pictureElement.querySelector('.big-picture__cancel');
const commentCountElement = document.querySelector('.social__comment-count');
const body = document.querySelector('body');
const socialCommentsLoader = pictureElement.querySelector('.comments-loader');
const socialCommentsList = pictureElement.querySelector('.social__comments');
const commentElement = pictureElement.querySelector('.big-picture__social').querySelector('.social__comment');

let commentsShown = 0;
let comments = [];
//Создание одного комментария
const createComment = ({avatar, message, name}) => {
  const comment = commentElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};
//Создание рандомных комментариев в модальном окне, под большим фото и отображение 5 комментариев на странице.
const renderComments = () => {
  commentsShown += COMMENTS_PER_PAGE;
  if (commentsShown >= comments.length) {
    socialCommentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    socialCommentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  socialCommentsList.innerHTML = '';
  socialCommentsList.append(fragment);
  //Показываем сколько комментариев отображено из общего количества, и кол-ва COMMENTS_PER_PAGE.
  commentCountElement.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};
//Загрузка новой порции комментариев
const onShowMoreComments = () => renderComments(comments);

//Скрытие модалки
const hideBigImage = () => {
  pictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  //Обнуляем количество комметариев
  commentsShown = 0;
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
  commentsCount.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  renderImageDetails(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments(comments);
  }
};
//отработчик для закрытия модалки по клику на крестик.
pictureCloseButton.addEventListener('click', onPictureCloseButton);
//отработчик для кнопки "Загрузить еще"
socialCommentsLoader.addEventListener('click', onShowMoreComments);

export { openBigImage };
