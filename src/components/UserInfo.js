class UserInfo {
  constructor(selectorProfile) {
    this._profileName = document.querySelector(selectorProfile.name);
    this._profileDescription = document.querySelector(selectorProfile.description);
    this._profileAvatar = document.querySelector(selectorProfile.avatar);
  }

  getUserInfo() {
    // Возвращает значения записаные в профиле
    const profileResult = {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent
    }
    return profileResult;
  }

  setUserInfo(profileData) {
    // Сохраняет новые данные в профиль страницы из формы
    this._profileName.textContent = profileData.name;
    this._profileDescription.textContent = profileData.about;
    this._profileAvatar.src = profileData.avatar;
  }
}

export { UserInfo };
