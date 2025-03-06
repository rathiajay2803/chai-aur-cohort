/**
 * Write your challenge solution here
 */

const addButton = document.getElementById('addButton');
const uiList = document.getElementById('taskList');
const emptyList = uiList.querySelector('li:first-child');

function updateTotalTaskNumber(e) {
  const totalTask = uiList.querySelectorAll('li').length - 1;
  document.getElementById('totalTasks').innerText = `Total tasks: ${totalTask}`;
}

function updateCompletedTaskNumber(e) {
  const completedTask = uiList.querySelectorAll('.completed').length;
  document.getElementById(
    'completedTasks'
  ).innerText = `Completed: ${completedTask}`;
}

function addcheckbox(element, content) {
  const checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  checkBox.classList.add('complete-checkbox');

  const span = document.createElement('span');
  const textNode = document.createTextNode(content);
  span.classList.add('task-text');
  span.appendChild(textNode);

  element.appendChild(checkBox);
  element.appendChild(span);
}

function addDeleteButton(element) {
  const delButton = document.createElement('button');
  delButton.classList.add('delete-button');
  delButton.innerText = 'Delete';
  element.appendChild(delButton);
}

function createListItem(content) {
  const li = document.createElement('li');
  li.classList.add('task-item');

  addcheckbox(li, content);
  addDeleteButton(li);
  return li;
}

function addTask(e) {
  const taskInput = document.getElementById('taskInput').value.trim();

  if (taskInput == '') {
    alert('Please enter the task');
    return;
  }

  if (emptyList.classList.contains('empty-list')) {
    emptyList.style.display = 'none';
  }

  const li = createListItem(taskInput);
  uiList.append(li);

  updateTotalTaskNumber(e);
  document.getElementById('taskInput').value = '';
}

function completeTask(e) {
  if (e.target.type === 'checkbox') {
    e.target.parentElement.classList.toggle('completed');
    updateTotalTaskNumber(e);
    updateCompletedTaskNumber(e);
  }
}

function deleteTask(e) {
  if (e.target.classList.contains('delete-button')) {
    e.target.parentElement.remove();

    if (uiList.children.length === 1) {
      emptyList.style.display = 'block';
    }

    updateTotalTaskNumber(e);
    updateCompletedTaskNumber(e);
  }
}

addButton.addEventListener('click', addTask);

uiList.addEventListener('input', completeTask);
uiList.addEventListener('click', deleteTask);
