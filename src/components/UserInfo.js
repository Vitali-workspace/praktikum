class UserInfo {
  constructor(selectorProfile) {
    this._profileName = document.querySelector(selectorProfile.name);
    this._profileDescription = document.querySelector(selectorProfile.description);
    this._profileAvatar = document.querySelector(selectorProfile.avatar);
  }

  getUserInfo(objsData) {
    // Возвращает значения записаные в профиле
    const profileResult = {
      name: this._profileName.textContent = objsData.serverName,
      description: this._profileDescription.textContent = objsData.serverJob,
      avatar: this._profileAvatar.src = objsData.serverAvatar
    }
    return profileResult;
  }

  setUserInfo(inputProfileName, inputProfileDescription, avatar) {
    // Сохраняет новые данные в профиль страницы из формы
    const profileName = this._profileName.textContent = inputProfileName.value;
    const profileDescription = this._profileDescription.textContent = inputProfileDescription.value;
    const profileAvatar = this._profileAvatar.src = avatar;

    const objProfile = { name: profileName, job: profileDescription, avatar: profileAvatar }
    return objProfile;
  }
}

export { UserInfo };
