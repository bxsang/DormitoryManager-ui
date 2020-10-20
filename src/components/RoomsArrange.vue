<template>
  <div class="room_manage_page">
    <Header />
    <mdb-container
      class="pt-5"
    >
      <div class="px-4 pb-4">
        <mdb-row>
          <mdb-col sm="6">
            <mdb-input
              type="textarea"
              outline
              wrapper-class="custom-purple-border"
              placeholder="Danh sách sinh viên"
              v-model="student_list"
            />
          </mdb-col>
          <mdb-col sm="6">
            <mdb-select
              multiple
              select-all
              @getValue="getSelectedBuildings"
              :options="buildings"
              label="Chọn toà nhà"
            />
          </mdb-col>
        </mdb-row>
        <div class="text-center">
          <mdb-btn
            gradient="peach"
            rounded
            @click.native="arrange"
          >
            Xếp
          </mdb-btn>
        </div>
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
    <mdb-modal
      :show="result_modal"
      @close="result_modal = false"
      info
    >
      <mdb-modal-header>
        <mdb-modal-title>Info</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body class="text-center">
        <p>{{ result }}</p>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn
          outline="info"
          @click.native="result_modal = false"
        >
          Đóng
        </mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </div>
</template>

<script>
import Header from './Header.vue';
import ArrangementsService from '../services/arrangements';
import Semeter from '../models/semeter';
import BuildingService from '../services/buildings';

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
      student_list: '',
      buildings: [],
      selected_buildings: [],
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
    mapArrangements(json) {
      this.arrangements_json = json;
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
      ArrangementsService.getArrangements(this.semeter)
        .then((json) => this.mapArrangements(json))
        .catch((err) => console.log(err));
    },
    exportCSVFile() {
      const config = {
        delimiter: ',',
        header: true,
      };
      const csv = this.$papa.unparse(this.arrangements_json, config);
      this.$papa.download(csv, `arrangements_${this.semeter.name}_list`);
    },
    getBuildings() {
      BuildingService.getBuildingList()
        .then((json) => this.mapBuildings(json))
        .catch((err) => console.log(err));
    },
    mapBuildings(buildings) {
      for (const building of buildings) {
        this.buildings.push({ text: building.name, value: building.name });
      }
    },
    getSelectedBuildings(value) {
      this.selected_buildings = value;
    },
    arrange() {
      ArrangementsService.arrange(this.semeter, this.student_list.split('\n'), this.selected_buildings)
        .then((json) => this.showResult(json.result))
        .catch((err) => console.log(err));
    },
    showResult(result) {
      this.result = JSON.stringify(result);
      this.result_modal = true;
    },
  },
  mounted() {
    this.getArrangements();
    this.getBuildings();
  },
};
</script>
