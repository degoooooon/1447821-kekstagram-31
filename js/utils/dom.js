// Удаление всех элементов по селектору
export const removeElements = (selector) => {
  document.querySelectorAll(selector).forEach((el) => el.remove());
};
