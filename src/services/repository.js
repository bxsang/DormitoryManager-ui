/* eslint-disable class-methods-use-this */
const API_URL = 'http://localhost:8080';

function getToken() {
  try {
    return JSON.parse(localStorage.getItem('login')).token;
  } catch (error) {
    return '';
  }
}

class Repository {
  constructor() {
    this.token = '';
  }

  async get(endpoint, _data = null) {
    this.token = getToken();
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: { Authorization: `Bearer ${this.token}` },
      body: JSON.stringify(_data),
    });
    return response.json();
  }

  async post(endpoint, data) {
    this.token = getToken();
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async put(endpoint, data) {
    this.token = getToken();
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async delete(endpoint) {
    this.token = getToken();
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.json();
  }
}

export default new Repository();
