import Notiflix from 'notiflix';

const firstDelay = document.querySelector('input[name="delay"]');
const delayStep = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const button = document.querySelector('button');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
button.addEventListener('click', onBtnClick);
function onBtnClick(evt) {
  evt.preventDefault();
  let delay = Number(firstDelay.value);
  let step = Number(delayStep.value);
  for (let i = 0; i < amount.value; i += 1) {
    createPromise(1 + i, delay + i * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}
