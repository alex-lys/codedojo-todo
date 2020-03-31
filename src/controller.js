class Controller {
    constructor(model, view) {
        this._model = model;
        this._view = view;

        view.on('add', this.addTodo.bind(this));
        view.on('toggle', this.toggleTodo.bind(this));
        view.on('edit', this.editTodo.bind(this));
        view.on('remove', this.removeTodo.bind(this));
    }

    addTodo(title) {
        const todo = this._model.addItem({
            id: Date.now(),
            title,
            completed: false,
        });

        this._view.addItem(todo);
    }

    toggleTodo({id, completed}) {
        const todo = this._model.updateItem(id, { completed });
        this._view.toggleItem(todo);
    }

    editTodo({id, title}) {
        const todo = this._model.updateItem(id, { title });

        this._view.editItem(todo);
    }

    removeTodo(id) {
        this._model.removeItem(id);
        this._view.removeItem(id);

    }
}

export default Controller;