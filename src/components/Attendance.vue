<template>
  <div class="attendance_manage_page">
    <Header />
    <mdb-container
      class="pt-5"
    >
      <div class="px-4 pb-4 form-inline d-flex justify-content-center">
        <p class="pr-4">
          Chọn ngày
        </p>
        <mdb-date-picker
          outline
          label="Ngày"
          v-model="date"
          @getValue="onDateChange"
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
  </div>
</template>

<script>
import Header from './Header.vue';
import Attendance from '../models/attendance';
import AttendanceService from '../services/attendance';

export default {
  components: {
    Header,
  },
  data() {
    return {
      date: localStorage.getItem('date'),
      attendance: new Attendance(localStorage.getItem('date'), '', ''),
      attendance_json: '',
      columns: [],
      rows: [],
      selected: null,
      message: '',
      result: '',
      result_modal: false,
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
      const keys = ['status', 'student_id'];
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
    exportCSVFile() {
      const config = {
        delimiter: ',',
        header: true,
      };
      const csv = this.$papa.unparse(this.attendance_json, config);
      this.$papa.download(csv, `attendance_${this.attendance.date}`);
    },
    onDateChange(date) {
      localStorage.setItem('date', date);
    },
  },
  mounted() {
    this.getAttendance();
  },
};
</script>
