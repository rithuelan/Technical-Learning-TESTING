const api = '/api/tasks';

async function fetchTasks() {
  const res = await fetch(api);
  return res.json();
}

function render(tasks) {
  const container = document.getElementById('tasks');
  container.innerHTML = '';
  tasks.forEach(t => {
    const el = document.createElement('div');
    el.className = 'task';
    el.innerHTML = `
      <div class="meta">
        <strong>${escapeHtml(t.title)}</strong>
        <div>${escapeHtml(t.description || '')}</div>
        <small>${t.done ? '✅ Done' : '◻️ Pending'}</small>
      </div>
      <div>
        <button data-id="${t.id}" class="toggle">Toggle</button>
        <button data-id="${t.id}" class="delete">Delete</button>
      </div>
    `;
    container.appendChild(el);
  });
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function loadAndRender() {
  const tasks = await fetchTasks();
  render(tasks);
}

document.getElementById('taskForm').addEventListener('submit', async e => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  await fetch(api, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, description }) });
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  loadAndRender();
});

document.getElementById('tasks').addEventListener('click', async e => {
  const id = e.target.dataset.id;
  if (!id) return;
  if (e.target.classList.contains('delete')) {
    await fetch(`${api}/${id}`, { method: 'DELETE' });
    loadAndRender();
  } else if (e.target.classList.contains('toggle')) {
    const res = await fetch(`${api}/${id}`);
    const t = await res.json();
    await fetch(`${api}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ done: !t.done }) });
    loadAndRender();
  }
});

loadAndRender();

//node -v
// npm -v

// mkdir task-manager
// cd task-manager

//npm install uuid
//npm run dev
//npm test
