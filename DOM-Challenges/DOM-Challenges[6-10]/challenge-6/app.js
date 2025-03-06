const numberRepresentation = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function updateDigitalClock() {
  const digitalClock = document.querySelector('.digital-clock');

  let date = new Date();
  let hour = date.getHours().toString().padStart(2, 0);
  let minute = date.getMinutes().toString().padStart(2, 0);
  let second = date.getSeconds().toString().padStart(2, 0);
  digitalClock.textContent = `${hour}:${minute}:${second}`;
}

function addNumericalRepresentation() {
  const clock = document.querySelector('.clock');
  for (const number of numberRepresentation) {
    const div = document.createElement('div');
    div.classList.add('number');
    const span = document.createElement('span');
    span.innerText = number;

    div.style.setProperty('--rotation', `${30 * number}deg`);

    div.appendChild(span);
    clock.appendChild(div);
  }
}

function updateAnalogClock() {
  const hourHand = document.querySelector('.hour');
  const minuteHand = document.querySelector('.minute');
  const secondHand = document.querySelector('.second');

  const now = new Date();
  let hour = now.getHours() % 12 || 12;
  let minute = now.getMinutes();
  let seconds = now.getSeconds();

  let secondRotation = seconds * 6;
  let minRotation = minute * 6 + seconds * 0.1;
  let hourRotation = 30 * hour + minute * 0.5;

  hourHand.style.transform = `rotate(${hourRotation}deg )`;
  minuteHand.style.transform = `rotate(${minRotation}deg)`;
  secondHand.style.transform = `rotate(${secondRotation}deg)`;
}

function init() {
  addNumericalRepresentation();
  updateAnalogClock();
  updateDigitalClock();
  setInterval(function () {
    updateAnalogClock();
    updateDigitalClock();
  }, 1000);
}

init();
