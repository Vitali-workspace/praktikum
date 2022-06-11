class UserInfo {
  constructor(selectorProfile) {
    this._profileName = document.querySelector(selectorProfile.name);
    this._profileDescription = document.querySelector(selectorProfile.description);
  }

  getUserInfo() {
    // Возвращает значения записаные в профиле
    const profileResult = {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent
    }
    return profileResult;
  }

  setUserInfo(inputProfileName, inputProfileDescription) {
    // запись нового текста в профиль из полей ввода
    this._profileName.textContent = inputProfileName.value;
    this._profileDescription.textContent = inputProfileDescription.value;
  }
}

export { UserInfo };
