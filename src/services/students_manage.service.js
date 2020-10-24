/* eslint-disable class-methods-use-this */
import Repository from './repository';

class StudentsManageService {
  getStudentsList() {
    return Repository.get('/students');
  }

  async addStudent(student) {
    const endpoint = `/students/${student.id}`;
    const response = await Repository.post(endpoint, student);
    if (!response.success) {
      throw new Error('response.message');
    }
    return response;
  }

  async addStudentBulk(students) {
    const endpoint = '/students';
    const response = await Repository.post(endpoint, students);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  }

  async editStudent(student) {
    const endpoint = `/students/${student.id}`;
    const response = await Repository.put(endpoint, student);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  }

  deteteStudent(student) {
    return Repository.delete(`/students/${student.id}`);
  }

  async getStudentArrangements(student) {
    const endpoint = `/students/${student.id}/arrangements`;
    const response = await Repository.get(endpoint);
    if (!response) {
      throw new Error(response);
    }
    return response;
  }

  async getStudentViolations(student) {
    const endpoint = `/students/${student.id}/violations`;
    const response = await Repository.get(endpoint);
    if (!response) {
      throw new Error(response);
    }
    return response;
  }

  async getStudentFinance(student) {
    const endpoint = `/students/${student.id}/finance`;
    const response = await Repository.get(endpoint);
    if (!response) {
      throw new Error(response);
    }
    return response;
  }
}

export default new StudentsManageService();
