/* eslint-disable class-methods-use-this */
import Repository from './repository';

class BuildingService {
  getBuildingList() {
    return Repository.get('/buildings');
  }

  async addBuilding(building) {
    const endpoint = `/buildings/${building.name}`;
    const response = await Repository.post(endpoint, null);
    if (!response.success) {
      throw new Error('response.message');
    }
    return response;
  }

  async addBuildingBulk(buildings) {
    const endpoint = '/buildings';
    const response = await Repository.post(endpoint, buildings);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  }

  deteteBuilding(building) {
    return Repository.delete(`/buildings/${building.name}`);
  }
}

export default new BuildingService();
