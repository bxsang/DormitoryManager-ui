<template>
  <div class="room_manage_page">
    <Header />
    <mdb-container
      class="pt-5"
    >
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
          >Danh sách sắp xếp phòng</a>
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
import SemesterService from '../services/semester';
import Semeter from '../models/semeter';

export default {
  components: {
    Header,
  },
  data() {
    return {
      semeter: new Semeter(localStorage.getItem('semeter')),
      arrangements_json: null,
      columns: [],
      rows: [],
      selected: null,
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
    mapArrangements(json) {
      this.semeters_json = json;
      const keys = ['id', 'room_name', 'student_id', 'semeter_name', 'assigned_time', 'assigned_employee'];
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
    getArrangements() {
      SemesterService.getArrangements(this.semeter)
        .then((json) => this.mapArrangements(json))
        .catch((err) => console.log(err));
    },
    exportCSVFile() {
      const config = {
        delimiter: ',',
        header: true,
      };
      const csv = this.$papa.unparse(this.semeters_json, config);
      this.$papa.download(csv, `arrangements_${this.semeter.name}_list`);
    },
  },
  mounted() { this.getArrangements(); },
};
</script>
