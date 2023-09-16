const elementTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');

const container = document.querySelector('.pictures');

const createImages = (pictures) => {
  document.querySelectorAll('.picture').forEach((thumbnail) => thumbnail.remove());
  const fragment = document.createDocumentFragment();

  pictures.forEach(({url, likes, description, comments, id}) => {
    const element = elementTemplate.cloneNode(true);

    element.querySelector('.picture__img').src = url;
    element.querySelector('.picture__img').alt = description;
    element.querySelector('.picture__likes').textContent = likes;
    element.querySelector('.picture__comments').textContent = comments.length;
    element.dataset.id = id;

    fragment.append(element);
  });

  container.append(fragment);
};

export { createImages };
