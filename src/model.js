class Model {
  constructor(state = []) {
    this._state = state;
  }

  getItem(id) {
    return this._state.find(item => item.id == id);
  }

  addItem(item) {
    this._state.push(item);

    return item;
  }

  updateItem(id, data) {
    const item = this.getItem(id);

    Object.keys(data).forEach(prop => item[prop] = data[prop]);

    return item;
  }

  removeItem(id) {
    const index = this._state.findIndex(item => item.id == id);

    if (index < -1) {
        this._state.splice(index, 1);
    }
  }
}

export default Model;