class Api {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _getHeaders() {
    return {
      authorization: this._token,
      "Content-Type": "application/json",
    };
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return res
      .json()
      .catch(() => ({}))
      .then((err) => Promise.reject({ status: res.status, ...err }));
  }

  _request(path, options = {}) {
    const headers = { ...this._getHeaders(), ...(options.headers || {}) };

    return fetch(`${this._baseUrl}${path}`, {
      ...options,
      headers,
    }).then((res) => this._checkResponse(res));
  }

  // ===== USERS =====
  getUserInfo() {
    return this._request("/users/me");
  }

  setUserInfo({ name, about }) {
    return this._request("/users/me", {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
  }

  setUserAvatar(avatar) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
  }

  // ===== CARDS =====
  getCardList() {
    return this._request("/cards");
  }

  addCard({ name, link }) {
    return this._request("/cards", {
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  changeLikeCardStatus(cardId, like) {
    return like
      ? this._request(`/cards/${cardId}/likes`, { method: "PUT" })
      : this._request(`/cards/${cardId}/likes`, { method: "DELETE" });
  }
}

// Instancia lista para usar
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  token: "64cef1a0-a8ed-45ba-8f33-ded402d03893",
});

export default api;
