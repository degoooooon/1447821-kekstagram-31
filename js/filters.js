import { renderThumbnails } from './render-thumbnails.js';
import { shuffle } from './utils/random.js';
import { removeElements } from './utils/dom.js';

const RANDOM_COUNT = 10;
const DELAY = 500;

const filters = document.querySelector('.img-filters');
const buttons = document.querySelectorAll('.img-filters__button');

const debounce = (fn, delay = DELAY) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

const applyFilter = (photos, type) => {
  removeElements('.picture');

  let result = photos;

  if (type === 'random') {
    result = shuffle(photos).slice(0, RANDOM_COUNT);
  }

  if (type === 'discussed') {
    result = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
  }

  renderThumbnails(result);
};

export const initFilters = (photos) => {
  filters.classList.remove('img-filters--inactive');

  const debounced = debounce(applyFilter);

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('img-filters__button--active'));
      btn.classList.add('img-filters__button--active');

      debounced(photos, btn.id.replace('filter-', ''));
    });
  });
};
