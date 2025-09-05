
const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const templateComment = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsList = document.querySelector('.social__comments');
const cancelButton = document.querySelector('.big-picture__cancel');
const buttonCommentLoader = document.querySelector('.social__comments-loader');
const commentsCount = document.querySelector('.social__comment-count');

const COMMENTS_PER_PORTION = 5;
let currentComments = [];
let displayCount = 0;

const createComment = ({ avatar, name, message }) => {
  const comment = templateComment.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const updateCommentCounter = () => {
  commentsCount.innerHTML = `${displayCount} из <span class="comments-count">${currentComments.length}</span> комментариев`;
};

const updateLoaderButton = () => {
  if(displayCount >= currentComments.length) {
    buttonCommentLoader.classList.add('hidden');
  } else {
    buttonCommentLoader.classList.remove('hidden');
  }
};

const renderNextCommentsPortion = () => {
  const nextComments = currentComments.slice(displayCount, displayCount + COMMENTS_PER_PORTION);
  const fragment = document.createDocumentFragment();

  nextComments.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  commentsList.append(fragment);
  displayCount += nextComments.length;

  updateCommentCounter();
  updateLoaderButton();
};

const initComments = (comments) => {
  commentsList.innerHTML = '';
  currentComments = comments;
  displayCount = 0;
  renderNextCommentsPortion();
};


const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', cancelEscape);
};

function cancelEscape(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const cancelButtonClick = () => {
  hideBigPicture();
};

cancelButton.addEventListener('click', cancelButtonClick);

const showBigPicture = (data) => {
  const { url, description, likes } = data;

  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;

  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', cancelEscape);

  initComments(data.comments);
};

buttonCommentLoader.addEventListener('click', renderNextCommentsPortion);

export { showBigPicture }