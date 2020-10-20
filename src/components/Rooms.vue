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
          >Danh sách phòng</a>
          <div>
            <mdb-btn
              outline="white"
              rounded
              size="sm"
              class="px-2"
              @click.native.prevent="getRoomArrangements"
            >
              <em class="fas fa-info mt-0" />
            </mdb-btn>
            <mdb-btn
              outline="white"
              rounded
              size="sm"
              class="px-2"
              @click.native="openAddRoomModal"
            >
              <em class="fas fa-plus mt-0" />
            </mdb-btn>
            <mdb-btn
              outline="white"
              rounded
              size="sm"
              class="px-2"
              @click.native.prevent="deleteRoom"
            >
              <em class="fas fa-times mt-0" />
            </mdb-btn>
            <mdb-modal
              :show="info_modal"
              @close="info_modal = false"
              info
            >
              <mdb-modal-header>
                <mdb-modal-title>Thông tin</mdb-modal-title>
              </mdb-modal-header>
              <mdb-modal-body class="text-center">
                <p v-html="room_arrangements" />
              </mdb-modal-body>
              <mdb-modal-footer center>
                <mdb-btn
                  outline="info"
                  @click.native="info_modal = false"
                >
                  Đóng
                </mdb-btn>
              </mdb-modal-footer>
            </mdb-modal>
            <mdb-modal
              :show="add_modal"
              @close="add_modal = false"
              cascade
              class="text-left"
            >
              <mdb-modal-header class="primary-color white-text">
                <h4 class="title">
                  <em class="fas fa-pencil-alt" /> Thêm phòng
                </h4>
              </mdb-modal-header>
              <mdb-modal-body class="grey-text">
                <mdb-input
                  size="sm"
                  label="Tên phòng"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  v-model="room.name"
                />
                <mdb-input
                  size="sm"
                  label="Sức chứa"
                  group
                  type="number"
                  validate
                  error="wrong"
                  success="right"
                  v-model="room.capacity"
                />
                <mdb-input
                  size="sm"
                  label="Tên toà nhà"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  v-model="room.building_name"
                />
              </mdb-modal-body>
              <mdb-modal-footer>
                <mdb-btn
                  color="secondary"
                  @click.native="add_modal = false"
                >
                  Đóng
                </mdb-btn>
                <mdb-btn
                  color="primary"
                  @click.native.prevent="addRoom"
                >
                  Thêm
                </mdb-btn>
              </mdb-modal-footer>
            </mdb-modal>
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
                  v-model="rooms_bulk_text"
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
                  @click.native.prevent="addRoomBulk"
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
import RoomsService from '../services/rooms';
import Room from '../models/room';
import Semeter from '../models/semeter';

export default {
  components: {
    Header,
  },
  data() {
    return {
      rooms_json: null,
      columns: [],
      rows: [],
      selected: null,
      room: new Room('', '', ''),
      message: '',
      info_modal: false,
      add_modal: false,
      edit_modal: false,
      upload_modal: false,
      success_modal: false,
      failed_modal: false,
      rooms_bulk: [],
      rooms_bulk_text: '',
      room_arrangements: '',
      semeter: new Semeter(localStorage.getItem('semeter')),
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
    mapRooms(json) {
      this.rooms_json = json;
      const keys = ['name', 'capacity', 'building_name'];
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
    getRooms() {
      RoomsService.getRoomList()
        .then((json) => this.mapRooms(json))
        .catch((err) => console.log(err));
    },
    refreshRooms() {
      this.columns = [];
      this.rows = [];
      this.getRooms();
    },
    openAddRoomModal() {
      this.room = new Room('', '', '');
      this.add_modal = true;
    },
    addRoom() {
      RoomsService.addRoom(this.room)
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
    addRoomBulk() {
      RoomsService.addRoomBulk(this.rooms_bulk)
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
    deleteRoom() {
      const { selected } = this;
      if (selected) {
        this.room = new Room(selected.name, selected.capacity, selected.building_name);
      }
      RoomsService.deteteRoom(this.room)
        .then(() => {
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
      const csv = this.$papa.unparse(this.rooms_json, config);
      this.$papa.download(csv, 'room_list');
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
      this.rooms_bulk_text = JSON.stringify(data);
      data.forEach(this.bindCSV);
    },
    bindCSV(value) {
      this.rooms_bulk.push(value);
    },
    getRoomArrangements() {
      const { selected } = this;
      if (selected) {
        this.room = new Room(selected.name, selected.capacity, selected.building_name);
      }
      RoomsService.getRoomArrangementsBySemeter(this.room, this.semeter)
        .then((response) => {
          this.room_arrangements = '';
          for (const arrangement of response) {
            this.room_arrangements += `MSSV: ${arrangement.student_id}; Thời gian: ${arrangement.assigned_time}<br>`;
          }
          this.info_modal = true;
        })
        .catch((error) => {
          this.message = `Error: ${error}`;
          this.failed_modal = true;
        });
    },
  },
  mounted() { this.getRooms(); },
};
</script>
