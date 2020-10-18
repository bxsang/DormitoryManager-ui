/* eslint-disable class-methods-use-this */
import Repository from './repository';

class SemesterService {
  getSemeterList() {
    return Repository.get('/semeters');
  }

  async addSemeter(semeter) {
    const endpoint = `/semeters/${semeter.name}`;
    const response = await Repository.post(endpoint, null);
    if (!response.success) {
      throw new Error('response.message');
    }
    return response;
  }

  async addSemeterBulk(semeters) {
    const endpoint = '/semeters';
    const response = await Repository.post(endpoint, semeters);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  }

  deteteSemeter(semeter) {
    return Repository.delete(`/semeters/${semeter.name}`);
  }
}

export default new SemesterService();
