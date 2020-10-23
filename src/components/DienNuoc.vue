<template>
  <div class="dien_nuoc_manage_page">
    <Header />
    <mdb-container
      class="pt-5"
    >
      <div class="px-4 pb-4 form-inline d-flex justify-content-center">
        <mdb-btn
          gradient="peach"
          rounded
          @click.native="tinhTien"
        >
          Tính tiền
        </mdb-btn>
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
          >Danh sách điện nước</a>
          <div>
            <mdb-btn
              outline="white"
              rounded
              size="sm"
              class="px-2"
              @click.native="openAddDienNuocModal"
            >
              <em class="fas fa-plus mt-0" />
            </mdb-btn>
            <mdb-btn
              outline="white"
              rounded
              size="sm"
              class="px-2"
              @click.native.prevent="deleteDienNuoc"
            >
              <em class="fas fa-times mt-0" />
            </mdb-btn>
            <mdb-modal
              :show="add_modal"
              @close="add_modal = false"
              cascade
              class="text-left"
            >
              <mdb-modal-header class="primary-color white-text">
                <h4 class="title">
                  <em class="fas fa-pencil-alt" /> Thêm số điện nước
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
                  v-model="dien_nuoc.room_name"
                />
                <mdb-input
                  size="sm"
                  label="Tên HK"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  v-model="dien_nuoc.semeter_name"
                />
                <mdb-input
                  size="sm"
                  label="Chỉ số nước"
                  group
                  type="number"
                  validate
                  error="wrong"
                  success="right"
                  v-model="dien_nuoc.water"
                />
                <mdb-input
                  size="sm"
                  label="Chỉ số điện"
                  group
                  type="number"
                  validate
                  error="wrong"
                  success="right"
                  v-model="dien_nuoc.electricity"
                />
                <mdb-input
                  size="sm"
                  label="ID đợt thu"
                  group
                  type="number"
                  validate
                  error="wrong"
                  success="right"
                  v-model="dien_nuoc.dot_id"
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
                  @click.native.prevent="addDienNuoc"
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
                  v-model="dien_nuoc_bulk_text"
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
                  @click.native.prevent="addDienNuocBulk"
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
import DienNuoc from '../models/dien_nuoc';
import DienNuocService from '../services/dien_nuoc';

export default {
  components: {
    Header,
  },
  data() {
    return {
      dien_nuoc: new DienNuoc(0, '', localStorage.getItem('semeter'), 0, 0, '', ''),
      dien_nuoc_json: null,
      columns: [],
      rows: [],
      selected: null,
      message: '',
      add_modal: false,
      upload_modal: false,
      success_modal: false,
      failed_modal: false,
      dien_nuoc_bulk: [],
      dien_nuoc_bulk_text: '',
      room_name: '',
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
    mapDienNuoc(json) {
      this.dien_nuoc_json = json;
      const keys = ['id', 'room_name', 'electricity', 'water', 'dot_id', 'date'];
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
    getDienNuoc() {
      DienNuocService.getDienNuoc()
        .then((json) => this.mapDienNuoc(json))
        .catch((err) => console.log(err));
    },
    openAddDienNuocModal() {
      this.dien_nuoc = new DienNuoc(0, '', '', 0, 0, '', '');
      this.add_modal = true;
    },
    addDienNuoc() {
      DienNuocService.addDienNuoc([this.dien_nuoc])
        .then(() => {
          this.add_modal = false;
          this.success_modal = true;
        })
        .catch((error) => {
          this.message = `Error: ${error}`;
          this.failed_modal = true;
        });
    },
    addDienNuocBulk() {
      DienNuocService.addDienNuoc(this.dien_nuoc_bulk)
        .then(() => {
          this.add_modal = false;
          this.success_modal = true;
          this.upload_modal = false;
        })
        .catch((error) => {
          this.message = `Error: ${error}`;
          this.failed_modal = true;
        });
    },
    deleteDienNuoc() {
      const { selected } = this;
      if (selected) {
        this.dien_nuoc = new DienNuoc(selected.id, '', '', 0, 0, '', '');
      }
      DienNuocService.deteteDienNuoc(this.dien_nuoc)
        .then(() => {
          this.success_modal = true;
        })
        .catch((error) => {
          this.message = `Error: ${error}`;
          this.failed_modal = true;
        });
    },
    tinhTien() {
      const { selected } = this;
      if (selected) {
        this.dien_nuoc = new DienNuoc(selected.id, selected.room_name, localStorage.getItem('semeter'), 0, 0, selected.dot_id, '');
      }
      DienNuocService.tinhTien([this.dien_nuoc])
        .then(() => {
          this.add_modal = false;
          this.success_modal = true;
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
      const csv = this.$papa.unparse(this.dien_nuoc_json, config);
      this.$papa.download(csv, 'dien_nuoc_list');
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
      this.dien_nuoc_bulk_text = JSON.stringify(data);
      data.forEach(this.bindCSV);
    },
    bindCSV(value) {
      this.dien_nuoc_bulk.push(value);
    },
  },
  mounted() { this.getDienNuoc(); },
};
</script>
