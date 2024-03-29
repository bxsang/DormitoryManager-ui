/* eslint-disable class-methods-use-this */
import Repository from './repository';

class ViolationsService {
  getViolations() {
    return Repository.get('/violations');
  }

  async addViolations(violations) {
    const endpoint = '/violations';
    const response = await Repository.post(endpoint, violations);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  }

  deteteViolations(violation) {
    return Repository.delete(`/violations/${violation.id}`);
  }
}

export default new ViolationsService();
