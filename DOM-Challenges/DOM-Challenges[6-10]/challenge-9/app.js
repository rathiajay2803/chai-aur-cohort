/**
 * Write your challenge solution here
 */
const controlPanel = document.querySelector('.panel');

function closeControlPanel(e) {
  if (e.target.matches('.toggle-btn')) {
    controlPanel.classList.toggle('active');
    return;
  }
  if (e.target.matches('.menu-item')) {
    alert(`you clicked ${e.target.textContent}`);
  }
  if (controlPanel.matches('.active')) {
    controlPanel.classList.remove('active');
  }
}

document.addEventListener('click', closeControlPanel);
