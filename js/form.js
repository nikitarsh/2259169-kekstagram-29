import { isEscapeKey } from './util.js';
const MAX_NUMBER_OF_HASHTAGS = 5;
const MAX_NUMBER_OF_CHARACTERS = 140;
const VALID_CHARACTERS = /^#[a-zа-яё0-9]{1,19}$/i;

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const closeButton = document.querySelector('.img-upload__cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const textareaInput = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const checkHashtagCount = (value) => normalizeTags(value).length <= MAX_NUMBER_OF_HASHTAGS;
const checkTextareaLength = (value) => (value).length <= MAX_NUMBER_OF_CHARACTERS;
const checkHashtagSymbols = (value) => normalizeTags(value).every((tag) => VALID_CHARACTERS.test(tag));

const checkHashtagUniqueness = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(
  hashtagInput,
  checkHashtagCount,
  `Максимальное количество хэш-тегов ${MAX_NUMBER_OF_HASHTAGS}`,
  true
);

pristine.addValidator(
  hashtagInput,
  checkHashtagUniqueness,
  'Хэш-теги не должны повторяться',
  true
);

pristine.addValidator(
  hashtagInput,
  checkHashtagSymbols,
  'Хэш-тег должен содержать от 1 до 19 букв или цифр после знака #',
  true
);

pristine.addValidator(
  textareaInput,
  checkTextareaLength,
  `Длина комментария не может составлять больше ${MAX_NUMBER_OF_CHARACTERS} символов`,
  true
);

const isTextFieldFocused = () =>
  document.activeElement === document.querySelector('.text__hashtags') ||
  document.activeElement === document.querySelector('.text__description');

function onDocumentKeydown (evt) {
  if(isEscapeKey(evt) && !isTextFieldFocused()) {
    closeEditingModal();
  }
}

function closeEditingModal() {
  form.reset();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadInput.value = '';
}

const onCloseButtonClick = () => {
  closeEditingModal();
};

const openEditingModal = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const onUploadInputChange = () => {
  openEditingModal();
};

uploadInput.addEventListener('change', onUploadInputChange);

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

