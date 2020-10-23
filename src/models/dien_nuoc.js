export default class DienNuoc {
  constructor(id, roomName, semeterName, electricity, water, dotId, date) {
    this.id = id;
    this.room_name = roomName;
    this.semeter_name = semeterName;
    this.electricity = electricity;
    this.water = water;
    this.dot_id = dotId;
    this.date = date;
  }
}
