export const initInput = (element: HTMLInputElement) => {
  console.log("initInput", element)
  setTimeout(() => {
    element.focus();
  }, 1);
};
