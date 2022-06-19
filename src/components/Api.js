class Api {
  constructor(configApi) {
    this._profileInfoUrl = configApi.profileInfoUrl;
    this._profileAvatarUrl = configApi.profileAvatarUrl;
    this._authorization = configApi.tokenAuthorization;
    this._cardsUrl = configApi.cardsUrl;
    this._likeCardUrl = configApi.likeCardUrl;
    this._deleteCardUrl = configApi.deleteCardUrl;
  }

  //*! Проверку нужно сделать отдельной функцией. Это примерный вариант.
  checkError(res) {
    if (res.status) {
      return res.json();
    }
  }

  // получаем данные карточек с сервера
  getInitialCards() {
    return fetch(this._cardsUrl, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .catch(err => Promise.reject(`произошла Ужасная ошибка с каточками: ${err}`));
  }


  // получаем данные профиля с сервера
  getProfileInfo() {
    return fetch(this._profileInfoUrl, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json()
      })
      .catch(err => Promise.reject(`произошла Ужасная ошибка с профилем: ${err}`));
  }
  // .then(res => console.log(res)) // тест ответа


  // отправка новых данных профиля на сервер
  changeProfileInfo(newProfileInfo) {
    return fetch(this._profileInfoUrl, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: `${newProfileInfo.name}`, about: `${newProfileInfo.job}` })
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  }

}

export { Api }
