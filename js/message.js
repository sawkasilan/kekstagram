import { hideUploadOverlay } from './form.js';

const sendMessageForm = (templateId, innerClass) => {
  const template = document.querySelector(`#${templateId}`);
  const templateModal = template.content.querySelector(`.${innerClass}`);
  const modal = templateModal.cloneNode(true);
  document.body.appendChild(modal);

  const closeModal = () => modal.remove();

  modal.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(`${innerClass}__button`) || !evt.target.closest(`${innerClass}__inner`)) {
      closeModal();
    }
  });

  const closeEsc = (evt) => {
    if (evt.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', closeEsc);
    }
  };

  document.addEventListener('keydown', closeEsc);
  hideUploadOverlay();
};

const sendMessageSuccess = () => sendMessageForm('success', 'success');
const sendMessageError = () => sendMessageForm('error', 'error');

export { sendMessageSuccess, sendMessageError };
