import './form.js';
import './scale.js';
import './effects.js';
import { renderGallery } from './gallery.js';
import { getData, sendData } from './api.js';
import { sendMessageSuccess, sendMessageError } from './message.js';
import { onSubmitForm } from './form.js';
import { turnFilterOn, filterPictures } from './img-filters.js';

const onLoadSuccess = (data) => {
  turnFilterOn(data);
  renderGallery(filterPictures());
};

const onLoadError = (error) => {
  const errorElement = document.createElement('div');
  errorElement.textContent = error;

  errorElement.style.position = 'fixed';
  errorElement.style.top = '0';
  errorElement.style.left = '0';
  errorElement.style.right = '0';
  errorElement.style.padding = '20px';
  errorElement.style.backgroundColor = 'red';
  errorElement.style.color = 'white';
  errorElement.style.fontSize = '18px';
  errorElement.style.textAlign = 'center';
  errorElement.style.zIndex = '1000';

  document.body.appendChild(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, 5000);
};

getData(onLoadSuccess, onLoadError);

onSubmitForm(async (data) => {
  await sendData(sendMessageSuccess, sendMessageError, data);
});

