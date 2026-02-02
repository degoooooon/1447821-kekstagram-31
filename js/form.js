// js/form.js
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const form = document.querySelector('.img-upload__form');
const submitButton = form.querySelector('.img-upload__submit');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.body;
const fileInput = form.querySelector('#upload-file');
const previewImage = form.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const SUBMIT_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const DEFAULT_BUTTON_TEXT = 'Отправить';
const SENDING_BUTTON_TEXT = 'Отправляю...';

// --------------------- БЛОКИРОВКА КНОПКИ ---------------------

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SENDING_BUTTON_TEXT;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = DEFAULT_BUTTON_TEXT;
};

// --------------------- СБРОС ФОРМЫ ---------------------

const resetFormState = () => {
  form.reset();
  resetScale();
  resetEffects();

  // Сбрасываем превью
  previewImage.src = 'img/upload-default-image.jpg';
  effectsPreview.forEach((preview) => {
    preview.style.backgroundImage = 'none';
  });

  // Закрываем форму
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  // Очищаем input файла
  fileInput.value = '';
};

// --------------------- УТИЛИТЫ ДЛЯ МОДАЛОК ---------------------

const isClickOutside = (evt, innerSelector) => {
  const inner = evt.target.closest(innerSelector);
  return !inner;
};

const onMessageEscKeydown = (evt, close) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    close();
  }
};

// --------------------- SUCCESS ---------------------

const showSuccessMessage = () => {
  const template = document.querySelector('#success').content.querySelector('.success');
  const element = template.cloneNode(true);
  const button = element.querySelector('.success__button');

  const close = () => {
    element.remove();
    document.removeEventListener('keydown', onEsc);
    document.removeEventListener('click', onClickOutside);
  };

  const onEsc = (evt) => onMessageEscKeydown(evt, close);
  const onClickOutside = (evt) => {
    if (isClickOutside(evt, '.success__inner')) {
      close();
    }
  };

  button.addEventListener('click', close);
  document.addEventListener('keydown', onEsc);
  document.addEventListener('click', onClickOutside);

  document.body.append(element);
};

// --------------------- ERROR ---------------------

const showErrorMessage = () => {
  const template = document.querySelector('#error').content.querySelector('.error');
  const element = template.cloneNode(true);
  const button = element.querySelector('.error__button');

  const close = () => {
    element.remove();
    document.removeEventListener('keydown', onEsc);
    document.removeEventListener('click', onClickOutside);
  };

  const onEsc = (evt) => onMessageEscKeydown(evt, close);
  const onClickOutside = (evt) => {
    if (isClickOutside(evt, '.error__inner')) {
      close();
    }
  };

  button.addEventListener('click', close);
  document.addEventListener('keydown', onEsc);
  document.addEventListener('click', onClickOutside);

  document.body.append(element);
};

// --------------------- ОТПРАВКА ---------------------

const sendForm = async () => {
  const formData = new FormData(form);

  const response = await fetch(SUBMIT_URL, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Ошибка отправки');
  }
};

// --------------------- ИНИЦИАЛИЗАЦИЯ ---------------------

const initFormSubmit = (pristine) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    // Проверка через Pristine
    if (!pristine.validate()) {
      return;
    }

    blockSubmitButton();

    try {
      await sendForm();
      resetFormState();
      showSuccessMessage();
    } catch (err) {
      showErrorMessage();
    } finally {
      unblockSubmitButton();
    }
  });
};

export { initFormSubmit };
