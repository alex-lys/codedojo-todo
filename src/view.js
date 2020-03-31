
import { createElement, EventEmitter } from './helpers';
class View extends EventEmitter{
  constructor() {
    super();

    this._form = document.getElementById('todo-form');
    this._input = document.getElementById('add-input');
    this._list = document.getElementById('todo-list');

    this._form.addEventListener('submit', this.handleAdd.bind(this));
  }

  createElement(todo) {
    const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox', checked: todo.completed ? 'checked' : '' });
    const label = createElement('label', { className: 'title' }, todo.title);
    const editInput = createElement('input', { type: 'text', className: 'textfield' });
    const editBtn = createElement('button', { className: 'edit' }, 'Изменить');
    const removeBtn = createElement('button', { className: 'remove' }, 'Удалить');
    const item = createElement('li', { className: `todo-item${todo.completed ? ' completed' : ''}`, 'data-id': todo.id }, checkbox, label, editInput, editBtn, removeBtn);

    return this.addEventListeners(item);
  }

  handleToggle({ target }) {
    const listItem = target.parentNode;
    const id = listItem.getAttribute('data-id');
    const completed = target.checked;

    this.emit('toggle', { id, completed });
  }

  handleEdit({ target }) {
    const listItem = target.parentNode;
    const id = listItem.getAttribute('data-id');
    const label = listItem.querySelector('.title');
    const input = listItem.querySelector('.textfield');
    const editBtn = listItem.querySelector('button.edit');
    const title = input.value;
    const isEditting = listItem.classList.contains('editing');

    if(isEditting) {
      this.emit('edit', { id, title });
    } else {
      input.value = label.textContent;
      editBtn.textContent = 'Сохранить';
      listItem.classList.add('editing');
    }
  }

  handleRemove({ target }) {
    const listItem = target.parentNode;
    const id = listItem.getAttribute('data-id');

    this.emit('remove', id);
  }

  handleAdd(event) {
    event.preventDefault();
    
    if (!this._input.value) {
      return alert('Необходимо ввести название задачи');
    }

    const value = this._input.value;

    this.emit('add', value);
  }

  addEventListeners(listItem) {
    const checkbox = listItem.querySelector('.checkbox');
    const editBtn = listItem.querySelector('button.edit');
    const removeBtn = listItem.querySelector('button.remove');

    checkbox.addEventListener('change', this.handleToggle.bind(this));
    editBtn.addEventListener('click', this.handleEdit.bind(this));
    removeBtn.addEventListener('click', this.handleRemove.bind(this));

    return listItem;
  }

  findListItem(id) {
    return this._list.querySelector(`[data-id="${id}"]`);
  }

  addItem(todo) {
    const listItem = this.createElement(todo);

    this._input.value = '';
    this._list.appendChild(listItem);
  }

  toggleItem(todo) {
    const listItem = this.findListItem(todo.id);
    const checkbox = listItem.querySelector('.checkbox');

    checkbox.checked = todo.completed;

    if (checkbox.checked) {
      listItem.classList.add('.completed');
    } else {
      listItem.classList.remove('.completed');
    }
  }

  editItem(todo) {
    const listItem = this.findListItem(todo.id);
    const label = listItem.querySelector('.title');
    const input = listItem.querySelector('.textfield');
    const editBtn = listItem.querySelector('button.edit');

    label.textContent = todo.title;
    editBtn.textContent = 'Изменить';
    listItem.classList.remove('editing');
  }

  removeItem(id) {
    const listItem = this.findListItem(id);

    this._list.removeChild(listItem);
  }
  
}

export default View;