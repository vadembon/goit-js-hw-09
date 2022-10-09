import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
const input = document.querySelector('#datetime-picker');

btnStart.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    btnStart.disabled = false;
  },
};

function countdownTimer() {
  let countdown = new Date(input.value) - new Date();
  let reversTime = convertMs(countdown);
  days.textContent = `${addLeadingZero(reversTime.days)}`;
  hours.textContent = `${addLeadingZero(reversTime.hours)}`;
  minutes.textContent = `${addLeadingZero(reversTime.minutes)}`;
  seconds.textContent = `${addLeadingZero(reversTime.seconds)}`;

  if (countdown <= 1000) {
    return clearInterval(timerId);
  }
}

let timerId = null;
btnStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    countdownTimer();
  }, 1000);
  if (timerId) {
    (btnStart.disabled = true) && (input.disabled = true);
    return;
  }
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
flatpickr(input, options);
