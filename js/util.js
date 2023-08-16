const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const ALERT_TIMEOUT = 5000;

const errorAlert = (message) => {
  const messageAlert = document.createElement('div');
  messageAlert.style.position = 'absolute';
  messageAlert.style.zIndex = '100';
  messageAlert.style.left = 0;
  messageAlert.style.top = 0;
  messageAlert.style.right = 0;
  messageAlert.style.textAlign = 'center';
  messageAlert.style.fontSize = '26px';
  messageAlert.style.backgroundColor = 'red';

  messageAlert.textContent = message;

  document.body.append(messageAlert);
  setTimeout(() => {
    errorAlert.remove();
  }, ALERT_TIMEOUT);
};


const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export { getRandomArrayElement, getRandomInteger, isEscapeKey, errorAlert };
