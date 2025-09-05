const templateThumbNail = document.querySelector('#picture').content.querySelector('.picture');

const createThumbNail = ({ url, description, likes, comments, id }) => {
  const thumbNail = templateThumbNail.cloneNode(true);

  thumbNail.querySelector('.picture__img').src = url;
  thumbNail.querySelector('.picture__img').alt = description;
  thumbNail.querySelector('.picture__likes').textContent = likes;
  thumbNail.querySelector('.picture__comments').textContent = Array.isArray(comments) ? comments.length : 0;

  thumbNail.dataset.thumbnailId = id;

  return thumbNail;
};

const generateThumbNail = (picturesArray, container) => {
  const fragment = document.createDocumentFragment();

  picturesArray.forEach((picture) => {
    const thumbNail = createThumbNail(picture);
    fragment.append(thumbNail);
  });

  container.append(fragment);
};

export { generateThumbNail }