const STORAGE_KEY = 'demo-codex-tasks-v1';
const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const list = document.querySelector('#task-list');
const empty = document.querySelector('#empty');
const count = document.querySelector('#count');
let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

function render() {
  list.replaceChildren();
  tasks.forEach((task, index) => {
    const row = document.createElement('li');
    row.className = task.done ? 'done' : '';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'; checkbox.className = 'task-toggle'; checkbox.checked = task.done;
    checkbox.setAttribute('aria-label', `Tandai ${task.text} selesai`);
    checkbox.addEventListener('change', () => { tasks[index].done = checkbox.checked; save(); });
    const label = document.createElement('span'); label.className = 'task-text'; label.textContent = task.text;
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'delete';
    remove.setAttribute('aria-label', `Hapus ${task.text}`); remove.textContent = '×';
    remove.addEventListener('click', () => { tasks.splice(index, 1); save(); });
    row.append(checkbox, label, remove); list.append(row);
  });
  empty.hidden = tasks.length > 0;
  count.textContent = `${tasks.length} tugas`;
}
function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); render(); }
form.addEventListener('submit', event => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ text, done: false }); input.value = ''; save(); input.focus();
});
render();
