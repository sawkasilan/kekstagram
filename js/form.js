import { resetScale } from './scale.js';

const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadButton = document.querySelector('#upload-cancel');
const submitButton = document.querySelector('#upload-submit');
const form = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const photoPreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

function showUploadOverlay() {
  body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', cancelUploadEscape);
}

export function hideUploadOverlay() {
  body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', cancelUploadEscape);
  form.reset();
  resetScale();
}

function cancelUploadEscape(evt) {
  if (evt.key === 'Escape') {
    const activeElement = document.activeElement;
    const isInputFocused = activeElement === hashtagsInput || activeElement === commentInput;

    if (!isInputFocused) {
      evt.preventDefault();
      hideUploadOverlay();
    }
  }
}

function onUploadButton() {
  hideUploadOverlay();
}

uploadButton.addEventListener('click', onUploadButton);

uploadFile.addEventListener('change', () => {
  const file = uploadFile.files[0];

  if (file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }

  showUploadOverlay();
});

const pristine = new Pristine(form, {
  classTo: 'form-field__wrapper',
  errorClass: 'has-error',
  successClass: 'has-succes',
  errorTextParent: 'form-field__wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

function validateHashtags(value) {
  if (!value.trim()) return true;

  const hashtags = value.trim().split(/\s+/);
  if (hashtags.length > 5) return false;

  const lowerTags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueTags = new Set(lowerTags);
  if (uniqueTags.size !== lowerTags.length) return false;

  return hashtags.every((tag) => /^#[a-zа-яё0-9]{1,19}$/i.test(tag));
}

function hashtagErrorMessage(value) {
  const hashtags = value.trim().split(/\s+/);
  if (hashtags.length > 5) return 'Хэштэгов не может быть более 5';

  const lowerTags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueTags = new Set(lowerTags);
  if (uniqueTags.size !== lowerTags.length) return 'Хэштеги не должны повторяться';

  if (!hashtags.every((tag) => /^#[a-zа-яё0-9]{1,19}$/i.test(tag))) return 'Неверный формат хэштэга';

  return '';
}

pristine.addValidator(hashtagsInput, validateHashtags, hashtagErrorMessage);

pristine.addValidator(commentInput, value => value.length <= 140, 'Комментарий не может быть длиннее 140 символов');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

export const onSubmitForm = (cb) => {
  form.addEventListener('submit', async (evt) => {

    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(form));
      unblockSubmitButton();
    }

  });
};

