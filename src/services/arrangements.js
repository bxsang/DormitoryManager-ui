/* eslint-disable class-methods-use-this */
import Repository from './repository';

class ArrangementsService {
  async getArrangements(semeter) {
    const endpoint = `/semeters/${semeter.name}/arrangements`;
    const response = await Repository.get(endpoint);
    if (!response) {
      throw new Error(response);
    }
    return response;
  }

  async arrange(semeter, students, building) {
    const endpoint = `/semeters/${semeter.name}/arrangements`;
    const data = { students, building };
    const response = await Repository.post(endpoint, data);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  }
}

export default new ArrangementsService();
