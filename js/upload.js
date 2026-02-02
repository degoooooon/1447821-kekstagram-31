// js/upload.js
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const uploadInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const body = document.body;
const previewImage = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    closeUploadForm();
  }
};

const openUploadForm = () => {
  resetScale();
  resetEffects();

  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeyDown);
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadInput.value = '';
  document.removeEventListener('keydown', onEscKeyDown);
};

const loadImage = () => {
  const file = uploadInput.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);

  // Основное изображение
  previewImage.src = url;

  // Превью эффектов
  effectsPreview.forEach((preview) => {
    preview.style.backgroundImage = `url(${url})`;
  });
};

const initUpload = () => {
  uploadInput.addEventListener('change', () => {
    loadImage();
    openUploadForm();
  });

  uploadCancel.addEventListener('click', closeUploadForm);
};

export { initUpload };