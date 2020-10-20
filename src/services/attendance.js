/* eslint-disable class-methods-use-this */
import Repository from './repository';

class AttendanceService {
  getAttendance(attendance) {
    return Repository.get(`/attendance/${attendance.date}`);
  }

  async addAttendance(attendance) {
    const endpoint = `/attendance/${localStorage.getItem('date')}`;
    const response = await Repository.post(endpoint, attendance);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  }
}

export default new AttendanceService();
