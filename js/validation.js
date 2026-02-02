// js/validation.js

const form = document.querySelector('.img-upload__form');
const hashtagsInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const HASHTAG_REGEX = /^#[a-zA-Zа-яА-ЯёЁ0-9]{1,19}$/;
const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

// --------------------- ХЭШТЕГИ ---------------------

const hashtagsValidator = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return true;

  const hashtags = trimmed
    .split(/\s+/)
    .map((tag) => tag.toLowerCase());

  if (hashtags.length > MAX_HASHTAGS) {
    hashtagsInput.dataset.error = 'Нельзя указать больше пяти хэштегов';
    return false;
  }

  for (const tag of hashtags) {
    if (tag[0] !== '#') {
      hashtagsInput.dataset.error = 'Хэштег должен начинаться с #';
      return false;
    }
    if (tag === '#') {
      hashtagsInput.dataset.error = 'Хэштег не может состоять только из #';
      return false;
    }
    if (!HASHTAG_REGEX.test(tag)) {
      hashtagsInput.dataset.error = 'Хэштег содержит недопустимые символы';
      return false;
    }
  }

  const unique = new Set(hashtags);
  if (unique.size !== hashtags.length) {
    hashtagsInput.dataset.error = 'Хэштеги не должны повторяться';
    return false;
  }

  hashtagsInput.dataset.error = '';
  return true;
};

const hashtagsErrorMessage = () => hashtagsInput.dataset.error;

// --------------------- КОММЕНТАРИЙ ---------------------

const commentValidator = (value) => {
  if (value.length > MAX_COMMENT_LENGTH) {
    commentInput.dataset.error = `Максимальная длина комментария — ${MAX_COMMENT_LENGTH} символов`;
    return false;
  }
  commentInput.dataset.error = '';
  return true;
};

const commentErrorMessage = () => commentInput.dataset.error;

// --------------------- ИНИЦИАЛИЗАЦИЯ PRISTINE ---------------------

const initValidation = () => {
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'pristine-error',
    errorClass: 'img-upload__field-wrapper--error'
  });

  pristine.addValidator(
    hashtagsInput,
    hashtagsValidator,
    hashtagsErrorMessage,
    1,
    true
  );

  pristine.addValidator(
    commentInput,
    commentValidator,
    commentErrorMessage,
    1,
    true
  );

  // Блокируем закрытие формы по Esc
  const blockEsc = (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  };

  hashtagsInput.addEventListener('keydown', blockEsc);
  commentInput.addEventListener('keydown', blockEsc);

  return pristine;
};

export { initValidation };