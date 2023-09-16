import { isEscapeKey } from './util.js';

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

const createComment = ({avatar, message, name}) => {
  const comment = commentElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

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
  commentCountElement.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};
const onShowMoreComments = () => renderComments(comments);


const hideBigImage = () => {
  pictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
};

function onDocumentKeydown(evt) {
  if (isEscapeKey) {
    evt.preventDefault();
    hideBigImage();
  }
}

const onPictureCloseButton = () => {
  hideBigImage();
};

const renderImageDetails = ({url, likes, description}) => {
  pictureElement.querySelector('.big-picture__img img').src = url;
  pictureElement.querySelector('.big-picture__img img').alt = description;
  pictureElement.querySelector('.likes-count').textContent = likes;
  pictureElement.querySelector('.social__caption').textContent = description;
};

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

pictureCloseButton.addEventListener('click', onPictureCloseButton);

socialCommentsLoader.addEventListener('click', onShowMoreComments);

export { openBigImage, hideBigImage };
