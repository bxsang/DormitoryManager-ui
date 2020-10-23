/* eslint-disable class-methods-use-this */
import Repository from './repository';

class DotThuService {
  getDotThuList() {
    return Repository.get('/dot_thu');
  }

  async addDotThu(dotThu) {
    const endpoint = '/dot_thu';
    const response = await Repository.post(endpoint, dotThu);
    if (!response.success) {
      throw new Error('response.message');
    }
    return response;
  }

  deteteDotThu(dotThu) {
    return Repository.delete(`/dot_thu/${dotThu.id}`);
  }
}

export default new DotThuService();
