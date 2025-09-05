import { generateThumbNail } from './thumbNail.js';
import { showBigPicture } from './big-picture.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.querySelectorAll('.picture').forEach((element) => element.remove());

  container.addEventListener('click', (evt) => {
    const thumbNail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbNail) return;

    evt.preventDefault();

    const picture = pictures.find(
      (item) => item.id === +thumbNail.dataset.thumbnailId
    );

    showBigPicture(picture);
  });

  generateThumbNail(pictures, container);
};

export { renderGallery };
