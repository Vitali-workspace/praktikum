class Section {
  constructor({ items, renderer }, selectorContainer) {
    this._items = items;
    this._renderer = renderer;
    this._selectorContainer = selectorContainer;
  }

  printElement() {
    // соединяет данные из масcива карточек с html шаблоном карточки
    this._items.forEach(element => {
      this._renderer(element);
    });
  }

  // добавляет карточку
  addItem(resultCard) {
    this._selectorContainer.prepend(resultCard);
  }
}

export { Section };
