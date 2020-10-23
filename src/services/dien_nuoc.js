/* eslint-disable class-methods-use-this */
import Repository from './repository';

class DienNuocService {
  getDienNuoc() {
    return Repository.get('/dien_nuoc');
  }

  async addDienNuoc(dienNuoc) {
    const endpoint = '/dien_nuoc';
    const response = await Repository.post(endpoint, dienNuoc);
    if (!response.success) {
      throw new Error('response.message');
    }
    return response;
  }

  deteteDienNuoc(dienNuoc) {
    return Repository.delete(`/dien_nuoc/${dienNuoc.id}`);
  }
}

export default new DienNuocService();
