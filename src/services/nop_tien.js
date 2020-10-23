/* eslint-disable class-methods-use-this */
import Repository from './repository';

class NopTienService {
  getNopTienList() {
    return Repository.get('/nop_tien');
  }

  async addNopTien(nopTien) {
    const endpoint = '/nop_tien';
    const response = await Repository.post(endpoint, nopTien);
    if (!response.success) {
      throw new Error('response.message');
    }
    return response;
  }

  deteteNopTien(nopTien) {
    return Repository.delete(`/nop_tien/${nopTien.id}`);
  }
}

export default new NopTienService();
