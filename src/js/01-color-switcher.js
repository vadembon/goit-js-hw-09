function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let timerId = null;

btnStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    body.style.background = getRandomHexColor();
  }, 1000);
  if (timerId) {
    btnStart.disabled = true;
    return;
  }
});
btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  btnStart.disabled = false;
});
