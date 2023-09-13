import { openBigImage } from './big-images.js';
import { createImages } from './create-miniature-images.js';

const container = document.querySelector('.pictures');

const openPicture = (pictures) => {
  container.addEventListener('click', (evt) => {
    const photo = evt.target.closest('[data-id]');
    if (!photo) {
      return;
    }

    evt.preventDefault();
    const picture = pictures.find((item) => item.id === +photo.dataset.id);
    openBigImage(picture);
  });
  createImages(pictures, container);
};

export { openPicture };
