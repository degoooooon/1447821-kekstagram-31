import { openBigPicture } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const element = pictureTemplate.cloneNode(true);

    element.querySelector('.picture__img').src = photo.url;
    element.querySelector('.picture__likes').textContent = photo.likes;
    element.querySelector('.picture__comments').textContent = photo.comments.length;

    // ВАЖНО: обработчик клика
    element.addEventListener('click', () => {
      openBigPicture(photo);
    });

    fragment.append(element);
  });

  picturesContainer.append(fragment);
};

export { renderThumbnails };
