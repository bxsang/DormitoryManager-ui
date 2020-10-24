/* eslint-disable class-methods-use-this */
import Repository from './repository';

class ManagersManageService {
  getManagersList() {
    return Repository.get('/managers');
  }

  async addManager(manager) {
    const endpoint = `/managers/${manager.username}`;
    const response = await Repository.post(endpoint, manager);
    if (!response.success) {
      throw new Error('response.message');
    }
    return response;
  }

  async addManagerBulk(managers) {
    const endpoint = '/managers';
    const response = await Repository.post(endpoint, managers);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  }

  async editManager(manager) {
    const endpoint = `/managers/${manager.username}`;
    const response = await Repository.put(endpoint, manager);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  }

  deteteManager(manager) {
    return Repository.delete(`/managers/${manager.username}`);
  }
}

export default new ManagersManageService();
