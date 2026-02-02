// js/effects.js
const previewImage = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');

const EFFECTS = {
  none: { min: 0, max: 100, step: 1, apply: () => 'none' },
  chrome: { min: 0, max: 1, step: 0.1, apply: (v) => `grayscale(${v})` },
  sepia: { min: 0, max: 1, step: 0.1, apply: (v) => `sepia(${v})` },
  marvin: { min: 0, max: 100, step: 1, apply: (v) => `invert(${v}%)` },
  phobos: { min: 0, max: 3, step: 0.1, apply: (v) => `blur(${v}px)` },
  heat: { min: 1, max: 3, step: 0.1, apply: (v) => `brightness(${v})` }
};

let currentEffect = 'none';

const initSlider = () => {
  noUiSlider.create(sliderElement, {
    range: { min: EFFECTS.none.min, max: EFFECTS.none.max },
    start: EFFECTS.none.max,
    step: EFFECTS.none.step,
    connect: 'lower'
  });

  sliderElement.noUiSlider.on('update', () => {
    const value = sliderElement.noUiSlider.get();
    effectValue.value = value;

    if (currentEffect === 'none') {
      previewImage.style.filter = 'none';
      return;
    }

    previewImage.style.filter = EFFECTS[currentEffect].apply(value);
  });
};

const onEffectChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) return;

  currentEffect = evt.target.value;

  if (currentEffect === 'none') {
    sliderContainer.classList.add('hidden');
    previewImage.style.filter = 'none';
    return;
  }

  sliderContainer.classList.remove('hidden');

  const effect = EFFECTS[currentEffect];

  sliderElement.noUiSlider.updateOptions({
    range: { min: effect.min, max: effect.max },
    start: effect.max,
    step: effect.step
  });
};

const resetEffects = () => {
  currentEffect = 'none';
  previewImage.style.filter = 'none';
  sliderContainer.classList.add('hidden');

  sliderElement.noUiSlider.updateOptions({
    range: { min: EFFECTS.none.min, max: EFFECTS.none.max },
    start: EFFECTS.none.max,
    step: EFFECTS.none.step
  });
};

const initEffects = () => {
  initSlider();
  effectsList.addEventListener('change', onEffectChange);
  resetEffects();
};

export { initEffects, resetEffects };