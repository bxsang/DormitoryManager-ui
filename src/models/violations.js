export default class Violation {
  constructor(id, studentId, semeterName, employeeId, message) {
    this.id = id;
    this.student_id = studentId;
    this.semeter_name = semeterName;
    this.employee_id = employeeId;
    this.message = message;
  }
}
