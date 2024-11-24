export const useScrollTo = (id) => {
  const element = document.getElementById(id);
  if (!element) return

  const position = element.offsetTop;
  window.scrollTo({
    top: position,
    behavior: 'smooth'
  });
};
