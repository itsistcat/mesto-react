const apiOptions = {
  url: "https://mesto.nomoreparties.co/v1/cohort-66/",
  headers: {
    authorization: "d647408b-bad2-4351-8f58-989ba8d12956",
    "Content-Type": "application/json"
  }
}

class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // _request(url, options) {
  //   return fetch(url, options).then(this._checkResponse)
  // }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    }) 
    .then(this._checkResponse);
  }

  editUserInfo(name, about) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    })
  }

  // Обновление аватара
  editUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar })
    })
  }

  getCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  // Добавление новой карточки в галерею
  addNewCards(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })

  }
  // Удаление карточки
  deleteCards(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  // Добавление лайка
  addLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
  }

  // Удаление лайка
  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
  }
}
export const api = new Api(apiOptions);