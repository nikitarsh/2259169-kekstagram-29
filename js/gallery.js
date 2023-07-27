import { openBigImage } from './big-images.js';
import { createImages } from './create-miniature-images.js';
const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const element = evt.target.closest('[data-element-id]');
    if (!element) {
      return;
    }

    evt.preventDefault();
    const picture = pictures.find (
      (item) => item.id === +element.dataset.elementId
    );
    openBigImage(picture);

  });
  createImages(pictures, container);
};


export {renderGallery};
