class Api {
  constructor(configApi) {
    this._profileInfoUrl = configApi.profileInfoUrl;
    this._profileAvatarUrl = configApi.profileAvatarUrl;
    this._authorization = configApi.tokenAuthorization;
    this._cardsUrl = configApi.cardsUrl;
    this._likeCardUrl = configApi.likeCardUrl;
    this._deleteCardUrl = configApi.deleteCardUrl;
  }

  // проверка на ошибки при отправке запроса на сервер
  checkError(res) {
    if (res.ok) {
      return res.json();
    }
  }

  // загрузка карточек с сервера
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


  // загрузка данных профиля с сервера
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

  // добавление новой карточки на сервер
  addCardServer(iputsInfo) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: `${iputsInfo.formName}`, link: `${iputsInfo.formText}` })
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  }

  // Удаление карточки на сервере.
  deleteCardServer(idCard) {
    return fetch(this._deleteCardUrl + `${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  }

  // Загрузка нового аватара на сервер
  addAvatarServer(link) {
    return fetch(this._profileAvatarUrl, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ avatar: `${link.formText}` })
    })
      .then(res => res.json())
      .then(err => Promise.reject(`произошла ошибка при отправке аватара: ${err}`));
  }

  // Добавление лайка на сервер
  likeCardServer(idCard) {
    return fetch(this._likeCardUrl + `${idCard}`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(err => Promise.reject(`произошла ошибка при добавлении лайка: ${err}`));
  }

  // Удаление лайка на сервере.
  //! Нужно ещё id прописать.
  deletelikeCardServer(idCard) {
    return fetch(this._likeCardUrl + `${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(err => Promise.reject(`произошла ошибка при удалении лайка: ${err}`));
  }

}

export { Api }
