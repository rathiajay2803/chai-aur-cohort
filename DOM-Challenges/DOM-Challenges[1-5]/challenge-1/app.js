/**
 * Write your challenge solution here
 */

const toggleButton = document.getElementById('toggleButton');
const bulb = document.getElementById('bulb');
const body = document.getElementById('body');
const buttonStatus = document.getElementById('status');

toggleButton.addEventListener('click', function () {
  bulb.classList.toggle('off');
  body.classList.toggle('dark-mode');
  if (bulb.classList.contains('off')) {
    var buttonText = 'Turn On';
    var status = 'Status: Off';
  } else {
    var buttonText = 'Turn Off';
    var status = 'Status: On';
  }
  toggleButton.innerText = `${buttonText}`;
  buttonStatus.innerText = `${status}`;
});
