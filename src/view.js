class View {
  constructor() {
    this._form = document.getElementById('todo-form');
    this._input = document.getElementById('add-input');
    this._list = document.getElementById('todo-list');
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

  
}

export default View;