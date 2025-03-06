/**
 * Write your challenge solution here
 */

const formContainer = document.querySelector('.form-container');
const nameDisplay = document.querySelector('#nameDisplay');
const jobDisplay = document.querySelector('#jobDisplay');
const ageDisplay = document.getElementById('ageDisplay');
const bioDisplay = document.getElementById('bioDisplay');

formContainer.addEventListener('input', function (e) {
  const inputField = e.target.id;
  switch (inputField) {
    case 'nameInput':
      nameDisplay.textContent = e.target.value;
      return;
    case 'jobInput':
      jobDisplay.textContent = e.target.value;
      return;
    case 'ageInput':
      ageDisplay.innerText = e.target.value;
      return;
    case 'bioInput':
      bioDisplay.innerText = e.target.value;
  }
});
