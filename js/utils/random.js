// Случайное целое число
export const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

// Случайный элемент массива
export const getRandomArrayItem = (array) =>
  array[getRandomInteger(0, array.length - 1)];

// Перемешивание массива
export const shuffle = (array) =>
  array.slice().sort(() => Math.random() - 0.5);
