class Api {
  constructor(config) {
    this._url = config.url;
    this._header = config.header;

    this._profileUrl = 'https://nomoreparties.co/v1/cohort-40/users/me';
    this._delCardUrl = 'https://mesto.nomoreparties.co/v1/cohort-40/cards/cardId';
    this._likeCardUrl = 'https://mesto.nomoreparties.co/v1/cohort-40/cards/cohort-40/likes';
    this._avatarUrl = 'https://mesto.nomoreparties.co/v1/cohort-40/users/me/avatar';
  }

  // Проверку нужно сделать отдельной функцией. Это примерный вариант.
  checkError(res) {
    if (res.status) {
      return res.json();
    }
  }

  // получаем данные карточек с сервера для отображения у нас
  getInitialCards() {
    return fetch(this._url, {
      method: 'GET',
      headers: this._header
    })
      .then(res => {
        if (res.ok) {
          console.log('Выполнен');
          return res.json();
        } else {
          Promise.reject(res.status)
        }
      })
      .then(res => {
        console.table(res)
      })
      .catch(err => console.log(err));
  }





}

export { Api }
