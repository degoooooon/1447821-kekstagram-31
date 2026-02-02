// js/scale.js
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

const STEP = 25;
const MIN = 25;
const MAX = 100;
const DEFAULT = 100;

const applyScale = (value) => {
  scaleValue.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
};

const onSmallerClick = () => {
  const current = parseInt(scaleValue.value, 10);
  if (current > MIN) {
    applyScale(current - STEP);
  }
};

const onBiggerClick = () => {
  const current = parseInt(scaleValue.value, 10);
  if (current < MAX) {
    applyScale(current + STEP);
  }
};

const resetScale = () => {
  applyScale(DEFAULT);
};

const initScale = () => {
  resetScale();
  scaleSmaller.addEventListener('click', onSmallerClick);
  scaleBigger.addEventListener('click', onBiggerClick);
};

export { initScale, resetScale };
