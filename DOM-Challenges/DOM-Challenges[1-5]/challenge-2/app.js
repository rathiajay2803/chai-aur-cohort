/**
 * Write your challenge solution here
 */

const colors = {
  redButton: '#e74c3c',
  greenButton: '#2ecc71',
  blueButton: '#3498db',
  purpleButton: '#9b59b6',
  resetButton: '#34495e',
};

const colorButtons = document.querySelector('.color-buttons');
const mainHeading = document.getElementById('mainHeading');

colorButtons.addEventListener('click', function (e) {
  console.log(e);
  const clickButtonId = e.target.id;
  if (clickButtonId) {
    mainHeading.style.color = colors[clickButtonId];
  }
});
