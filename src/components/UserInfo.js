class UserInfo {
  constructor(selectorProfile) {
    this._profileName = document.querySelector(selectorProfile.name);
    this._profileDescription = document.querySelector(selectorProfile.description);
    //this._profileAvatar = '';
    // ! нужен селектор на аватар в профиле. objsData.serverAvatar
  }

  getUserInfo(objsData) {
    // Возвращает значения записаные в профиле
    // ! нужен this._profileAvatar. objsData.serverAvatar
    //console.log(objsData.serverName);

    const profileResult = {
      name: this._profileName.textContent = objsData.serverName,
      description: this._profileDescription.textContent = objsData.serverJob,
      avatar: ''
    }
    return profileResult;
  }

  // ! Тут данные уйдут на сервер.
  setUserInfo(inputProfileName, inputProfileDescription) {
    // запись нового текста в профиль из полей ввода
    const a = this._profileName.textContent = inputProfileName.value;
    const b = this._profileDescription.textContent = inputProfileDescription.value;
    const obj = { name: a, job: b }
    return obj;
  }
}

export { UserInfo };
