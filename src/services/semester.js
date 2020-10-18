/* eslint-disable class-methods-use-this */
import Repository from './repository';

class SemesterService {
  getSemeterList() {
    return Repository.get('/semeters');
  }

  async addSemeter(semeterName) {
    const endpoint = `/semeters/${semeterName}`;
    const response = await Repository.post(endpoint, null);
    if (!response.success) {
      throw new Error('response.message');
    }
    return response;
  }

  deteteSemeter(semeterName) {
    return Repository.delete(`/semeters/${semeterName.id}`);
  }
}

export default new SemesterService();
