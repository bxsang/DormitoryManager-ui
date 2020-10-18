/* eslint-disable class-methods-use-this */
import Repository from './repository';

class RoomsService {
  getRoomList() {
    return Repository.get('/rooms');
  }

  async addRoom(room) {
    const endpoint = `/rooms/${room.name}`;
    const response = await Repository.post(endpoint, room);
    if (!response.success) {
      throw new Error('response.message');
    }
    return response;
  }

  async addRoomBulk(rooms) {
    const endpoint = '/rooms';
    const response = await Repository.post(endpoint, rooms);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  }

  deteteRoom(room) {
    return Repository.delete(`/rooms/${room.name}`);
  }
}

export default new RoomsService();
