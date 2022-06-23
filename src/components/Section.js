class Section {
  constructor({ renderer }, selectorContainer) {
    this._renderer = renderer;
    this._selectorContainer = selectorContainer;
  }

  printElement(items) {
    // соединяет данные из масcива карточек с html шаблоном карточки
    items.forEach(element => {
      this._renderer(element);
    });
  }

  // добавляет загруженные карточки с сервера
  addItem(resultCard) {
    this._selectorContainer.append(resultCard);
  }

  // добавляет карточку загруженную пользователем
  addItemUser(resultCard) {
    this._selectorContainer.prepend(resultCard);
  }

}

export { Section };
