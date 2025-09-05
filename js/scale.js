const image = document.querySelector('.img-upload__preview img');
const scaleValue = document.querySelector('.scale__control--value');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const DEFAULT_SCALE = 100;
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const imageScale = (value = DEFAULT_SCALE) => {
  image.style.transform = `scale(${value / 100})`;
  scaleValue.value = `${value}%`;
};

const smallerButtonClick = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }

  imageScale(newValue);
};

const biggerButtonClick = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  let newValue = currentValue + SCALE_STEP;

  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }

  imageScale(newValue);
};

const resetScale = () => {
  imageScale(DEFAULT_SCALE);
};

smallerButton.addEventListener('click', smallerButtonClick);
biggerButton.addEventListener('click', biggerButtonClick);

export { resetScale }