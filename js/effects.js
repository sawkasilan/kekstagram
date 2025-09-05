const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const previewImage = document.querySelector('.img-upload__preview img');
const effectsRadio = document.querySelectorAll('.effects__radio');


const EFFECTS = {
  none: {
    class: '',
    filter: '',
    min: 0,
    max: 100,
    step: 1,
    start: 100,
    unit: '',
  },
  chrome: {
    class: 'effects__preview--chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    unit: '',
  },
  sepia: {
    class: 'effects__preview--sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    unit: '',
  },
  marvin: {
    class: 'effects__preview--marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    start: 100,
    unit: '%',
  },
  phobos: {
    class: 'effects__preview--phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
    unit: 'px',
  },
  heat: {
    class: 'effects__preview--heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    start: 3,
    unit: '',
  },
};


noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const updateSlider = ({ min, max, step, start }) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: { min, max },
    start,
    step,
  });
};

let currentEffect = 'none';


effectLevelSlider.noUiSlider.on('update', () => {
  const value = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = value;

  if (currentEffect === 'none') {
    previewImage.style.filter = '';
  } else {
    const { filter, unit } = EFFECTS[currentEffect];
    previewImage.style.filter = `${filter}(${value}${unit})`;
  }
});



effectsRadio.forEach((radio) => {
  radio.addEventListener('change', () => {
    currentEffect = radio.value;

    previewImage.className = '';

    const effectClass = EFFECTS[currentEffect].class;
    if (effectClass) {
      previewImage.classList.add(effectClass);
    }

    updateSlider(EFFECTS[currentEffect]);

    const isNone = currentEffect === 'none';
    effectLevelSlider.parentElement.classList.toggle('hidden', isNone);
  });
});
