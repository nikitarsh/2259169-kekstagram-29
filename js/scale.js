const imageScale = {
  MIN: 25,
  MAX: 100,
  DEFAULT: 100,
  STEP: 25
};

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const photoPreview = document.querySelector('.img-upload__preview img');

const scalePhoto = (value) => {
  scaleInput.value = `${value}%`
  photoPreview.style.scale = value / 100;
}

const onDecreaseButtonClick = () => {
  const currentValue = parseInt (scaleInput.value, 10);
  const newValue = Math.max(currentValue - imageScale.STEP, imageScale.MIN);
  scalePhoto(newValue);
}

const onIncreaseButtonClick = () => {
  const currentValue = parseInt (scaleInput.value, 10);
  const newValue = Math.min(currentValue + imageScale.STEP, imageScale.MAX);
  scalePhoto(newValue);
}

const defaultScale = () => {
  scalePhoto(imageScale.DEFAULT)
}

const setScale = () => {
  smallerButton.addEventListener('click', onDecreaseButtonClick);
  biggerButton.addEventListener('click', onIncreaseButtonClick)
}

export {setScale, defaultScale};
