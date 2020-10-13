/* eslint-disable class-methods-use-this */
import Repository from './repository';

class AuthService {
  async login(data) {
    let endpoint = '/managers/login';
    if (!data.isManager) {
      endpoint = '/students/login';
    }
    const response = await Repository.post(endpoint, data.credentials);
    if (response.success && response.token != null) {
      localStorage.setItem('login', JSON.stringify(response));
      localStorage.setItem('isLastLoginAdmin', ['admin', 'manager'].includes(response.user.role));
    } else {
      throw new Error('Login failed');
    }
    return response;
  }

  logout() {
    localStorage.removeItem('login');
  }

  getInfo() {
    return Repository.get('/me');
  }
}

export default new AuthService();
