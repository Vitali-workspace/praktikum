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
          console.log('Всё выполнилось успешно');
          return res.json();
        } else {
          Promise.reject(`произошла ужасная ошибка: ${res.status}`)
        }
      })
      .then((data) => {
        console.log(data[1])
      })
      .catch(err => console.log(err));
  }


  // получаем данные профиля с сервера для отображения у нас
  getProfileInfo() {
    return fetch(this._profileUrl, {
      method: 'GET',
      headers: this._header
    })
      .then(res => res.json())
      //.then(res => { if (res.ok) { console.log('всё впорядке') } })
      .then(res => {
        console.table(res)
        return res
      }).then(res => Promise.resolve(`не ужели заработал: ${res.about}`))
      //.then(Promise.resolve(res))
      .catch(err => Promise.reject(`произошла ужасная ошибка: ${err}`));
  }



}

export { Api }
