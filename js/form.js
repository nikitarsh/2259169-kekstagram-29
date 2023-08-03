const MAX_NUMBER_OF_HASHTAGS = 5;
const MAX_NUMBER_OF_CHARACTERS = 140;
const VALID_CHARACTERS = /^#[a-zа-яё0-9]{1,19}$/i;

const form = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadClose = document.querySelector('.img-upload__cancel');
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

const hashtagCountCheck = (value) => normalizeTags(value).length <= MAX_NUMBER_OF_HASHTAGS;
const textareaMaxLengthCheck = (value) => (value).length <= MAX_NUMBER_OF_CHARACTERS;
const hashtagValidCharctersCheck = (value) => normalizeTags(value).every((tag) => VALID_CHARACTERS.test(tag));

const hashtagUniqueCheck = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(
  hashtagInput,
  hashtagCountCheck,
  `Максимальное количество хэш-тегов ${MAX_NUMBER_OF_HASHTAGS}`,
  true
);

pristine.addValidator(
  hashtagInput,
  hashtagUniqueCheck,
  'Хэш-теги не должны повторяться',
  true
);

pristine.addValidator(
  hashtagInput,
  hashtagValidCharctersCheck,
  'Хэш-тег должен содержать от 1 до 19 букв или цифр после знака #',
  true
);

pristine.addValidator(
  textareaInput,
  textareaMaxLengthCheck,
  `Длина комментария не может составлять больше ${MAX_NUMBER_OF_CHARACTERS} символов`,
  true
);

const isTextFieldFocused = () =>
  document.activeElement === document.querySelector('.text__hashtags') ||
  document.activeElement === document.querySelector('.text__description');

const onDocumentKeydown = (evt) => {
  const isEscapeKey = () => evt.key === 'Escape' && !isTextFieldFocused();
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
};

function closeForm() {
  pristine.reset();
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadInput.value = '';
}

const imageEditingForm = () => {
  pristine.reset();
  form.reset();
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  uploadClose.addEventListener('click', closeForm);
  document.addEventListener('keydown', onDocumentKeydown);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

uploadInput.addEventListener('change', imageEditingForm);
form.addEventListener('submit', onFormSubmit);
