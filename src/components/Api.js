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

  // получаем данные карточек с сервера для отображения у нас
  getInitialCards() {
    return fetch(this._cardsUrl, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => console.log(res)) // тест ответа
      .catch(err => Promise.reject(`произошла Ужасная ошибка с каточками: ${err}`));
  }


  // получаем данные профиля с сервера для отображения у нас (В текущем виде работает)
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


}

export { Api }
