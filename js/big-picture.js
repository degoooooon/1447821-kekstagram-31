const modal = document.querySelector('.big-picture');
const img = modal.querySelector('.big-picture__img img');
const caption = modal.querySelector('.social__caption');
const likes = modal.querySelector('.likes-count');
const commentsList = modal.querySelector('.social__comments');
const shown = modal.querySelector('.social__comment-shown-count');
const total = modal.querySelector('.social__comment-total-count');
const loader = modal.querySelector('.comments-loader');
const closeBtn = modal.querySelector('.big-picture__cancel');

let comments = [];
let rendered = 0;
const STEP = 5;

const createComment = ({ avatar, name, message }) => {
  const li = document.createElement('li');
  li.classList.add('social__comment');

  li.innerHTML = `
    <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>
  `;

  return li;
};

const renderComments = () => {
  const next = comments.slice(rendered, rendered + STEP);

  next.forEach((c) => commentsList.append(createComment(c)));

  rendered += next.length;
  shown.textContent = rendered;
  total.textContent = comments.length;

  if (rendered >= comments.length) {
    loader.classList.add('hidden');
  }
};

export const openBigPicture = (photo) => {
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  img.src = photo.url;
  caption.textContent = photo.description;
  likes.textContent = photo.likes;

  commentsList.innerHTML = '';
  comments = photo.comments;
  rendered = 0;

  loader.classList.toggle('hidden', comments.length === 0);

  renderComments();

  document.addEventListener('keydown', onEsc);
};

const close = () => {
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEsc);
};

function onEsc(evt) {
  if (evt.key === 'Escape') close();
}

loader.addEventListener('click', renderComments);
closeBtn.addEventListener('click', close);
