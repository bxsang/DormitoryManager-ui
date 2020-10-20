/* eslint-disable class-methods-use-this */
import Repository from './repository';

class AttendanceService {
  getAttendance(attendance) {
    return Repository.get(`/attendance/${attendance.date}`);
  }
}

export default new AttendanceService();
