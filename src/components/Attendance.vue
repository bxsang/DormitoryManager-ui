<template>
  <div class="attendance_manage_page">
    <Header />
    <mdb-container
      class="pt-5"
    >
      <div class="px-4 pb-4 form-inline d-flex justify-content-center">
        <p class="px-4">
          Chọn ngày
        </p>
        <mdb-date-picker
          outline
          label="Ngày"
          v-model="date"
          @getValue="onDateChange"
        />
        <p class="px-4">
          Chọn phòng
        </p>
        <mdb-select
          v-model="rooms"
          placeholder="Phòng"
          label=""
          @change="onRoomChange($event)"
        />
      </div>
      <div class="card card-cascade narrower">
        <div
          class="view view-cascade gradient-card-header blue-gradient narrower
            py-2 mx-4 mb-3 d-flex justify-content-between align-items-center"
        >
          <div>
            <mdb-btn
              outline="white"
              rounded
              size="sm"
              class="px-2"
              @click.native.prevent="exportCSVFile"
            >
              <em class="fas fa-download mt-0" />
            </mdb-btn>
            <mdb-btn
              outline="white"
              rounded
              size="sm"
              class="px-2"
              @click.native.prevent="upload_modal = true"
            >
              <em class="fas fa-upload mt-0" />
            </mdb-btn>
          </div>
          <a
            class="white-text mx-3"
          >Danh sách điểm danh</a>
        </div>
        <div class="px-4 pb-4">
          <mdb-datatable
            class="text-center"
            :data="data"
            bordered
            hover
            responsive
            :tfoot="false"
            focus
            checkbox
            @selectRow="selected = data.rows[$event]"
          />
        </div>
      </div>
    </mdb-container>
    <mdb-modal
      :show="upload_modal"
      @close="upload_modal = false"
      cascade
      class="text-left"
    >
      <mdb-modal-header class="primary-color white-text">
        <h4 class="title">
          <em class="fas fa-pencil-alt" /> Upload file
        </h4>
      </mdb-modal-header>
      <mdb-modal-body class="grey-text">
        <mdb-input
          size="sm"
          group
          type="file"
          @change="importLocalFile"
        />
        <textarea
          type="text"
          id="defaultFormContactMessageEx"
          class="form-control"
          rows="3"
          v-model="attendance_bulk_text"
        />
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn
          color="secondary"
          @click.native="upload_modal = false"
        >
          Đóng
        </mdb-btn>
        <mdb-btn
          color="primary"
          @click.native.prevent="addAttendanceFile"
        >
          Upload
        </mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    <mdb-modal
      :show="success_modal"
      @close="success_modal = false"
      success
    >
      <mdb-modal-header>
        <mdb-modal-title>Success</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body class="text-center">
        <mdb-icon
          icon="check"
          size="4x"
          class="mb-3 animated rotateIn"
        />
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn
          outline="success"
          @click.native="success_modal = false"
        >
          Đóng
        </mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    <mdb-modal
      :show="failed_modal"
      @close="failed_modal = false"
      danger
    >
      <mdb-modal-header>
        <mdb-modal-title>Failed</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body class="text-center">
        <mdb-icon
          icon="times"
          size="4x"
          class="mb-3 animated rotateIn"
        />
        <p>{{ message }}</p>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn
          outline="danger"
          @click.native="failed_modal = false"
        >
          Đóng
        </mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </div>
</template>

<script>
import Header from './Header.vue';
import Attendance from '../models/attendance';
import AttendanceService from '../services/attendance';
import RoomsService from '../services/rooms';

export default {
  components: {
    Header,
  },
  data() {
    return {
      date: localStorage.getItem('date'),
      rooms: [],
      current_room: null,
      attendance: new Attendance(localStorage.getItem('date'), '', ''),
      attendance_json: '',
      columns: [],
      rows: [],
      selected: null,
      upload_modal: false,
      attendance_bulk: [],
      attendance_bulk_text: '',
      success_modal: false,
      failed_modal: false,
      message: '',
    };
  },
  computed: {
    data() {
      return {
        columns: this.columns,
        rows: this.rows,
      };
    },
  },
  methods: {
    filterData(dataArr, keys) {
      const data = dataArr.map((entry) => {
        const filteredEntry = {};
        keys.forEach((key) => {
          if (key in entry) {
            filteredEntry[key] = entry[key];
          }
        });
        return filteredEntry;
      });
      return data;
    },
    mapAttendance(json) {
      this.attendance_json = json;
      const keys = ['date', 'status', 'student_id'];
      const entries = this.filterData(json, keys);
      // columns
      this.columns = keys.map((key) => ({
        label: key.toUpperCase(),
        field: key,
        sort: 'asc',
      }));
      // rows
      entries.map((entry) => this.rows.push(entry));
    },
    getAttendance() {
      AttendanceService.getAttendance(this.attendance)
        .then((json) => this.mapAttendance(json))
        .catch((err) => console.log(err));
    },
    addAttendanceFile() {
      AttendanceService.addAttendance(this.attendance_bulk)
        .then(() => {
          this.add_modal = false;
          this.success_modal = true;
          this.refreshRooms();
        })
        .catch((error) => {
          this.message = `Error: ${error}`;
          this.failed_modal = true;
        });
    },
    exportCSVFile() {
      const config = {
        delimiter: ',',
        header: true,
      };
      const csv = this.$papa.unparse(this.attendance_json, config);
      this.$papa.download(csv, `attendance_${this.attendance.date}`);
    },
    async importLocalFile() {
      // eslint-disable-next-line no-restricted-globals
      const file = event.target.files[0];
      const data = await new Promise((success) => {
        this.$papa.parse(file, {
          header: true,
          complete(results) {
            const result = results.data;
            if (result) {
              success(result);
            }
          },
        });
      });
      this.attendance_bulk_text = JSON.stringify(data);
      data.forEach(this.bindCSV);
    },
    bindCSV(value) {
      this.attendance_bulk.push(value);
    },
    onDateChange(date) {
      localStorage.setItem('date', date);
    },
    onRoomChange(event) {
      this.current_room = event;
    },
    getRooms() {
      RoomsService.getRoomList()
        .then((response) => this.mapRooms(response))
        .catch((err) => console.log(err));
    },
    mapRooms(rooms) {
      for (const room in rooms) {
        const roomName = rooms[room].name;
        this.rooms.push({
          text: roomName,
          value: roomName,
          selected: roomName === this.current_room,
        });
      }
    },
  },
  mounted() {
    this.getAttendance();
    this.getRooms();
  },
};
</script>
