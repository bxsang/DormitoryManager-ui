<template>
  <div class="nop_tien_manage_page">
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
          >Danh sách đợt thu</a>
          <div>
            <mdb-btn
              outline="white"
              rounded
              size="sm"
              class="px-2"
              @click.native="openAddNopTienModal"
            >
              <em class="fas fa-plus mt-0" />
            </mdb-btn>
            <mdb-btn
              outline="white"
              rounded
              size="sm"
              class="px-2"
              @click.native.prevent="deleteNopTien"
            >
              <em class="fas fa-times mt-0" />
            </mdb-btn>
            <mdb-btn
              outline="white"
              rounded
              size="sm"
              class="px-2"
              @click.native.prevent="daNop"
            >
              <em class="fas fa-check mt-0" />
            </mdb-btn>
            <mdb-modal
              :show="add_modal"
              @close="add_modal = false"
              cascade
              class="text-left"
            >
              <mdb-modal-header class="primary-color white-text">
                <h4 class="title">
                  <em class="fas fa-pencil-alt" /> Thêm tiền phải nộp
                </h4>
              </mdb-modal-header>
              <mdb-modal-body class="grey-text">
                <mdb-input
                  size="sm"
                  label="MSSV"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  v-model="nop_tien.student_id"
                />
                <mdb-input
                  size="sm"
                  label="ID đợt"
                  group
                  type="number"
                  validate
                  error="wrong"
                  success="right"
                  v-model="nop_tien.dot_id"
                />
                <mdb-input
                  size="sm"
                  label="Số tiền"
                  group
                  type="number"
                  validate
                  error="wrong"
                  success="right"
                  v-model="nop_tien.so_tien"
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
                  @click.native.prevent="addNopTien"
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
                  v-model="nop_tien_bulk_text"
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
                  @click.native.prevent="addNopTienBulk"
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
import NopTien from '../models/nop_tien';
import NopTienService from '../services/nop_tien';

export default {
  components: {
    Header,
  },
  data() {
    return {
      nop_tien: new NopTien(0, '', 0, 0, 0),
      nop_tien_json: null,
      columns: [],
      rows: [],
      selected: null,
      message: '',
      add_modal: false,
      upload_modal: false,
      success_modal: false,
      failed_modal: false,
      nop_tien_bulk: [],
      nop_tien_bulk_text: '',
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
    mapNopTien(json) {
      this.nop_tien_json = json;
      const keys = ['id', 'student_id', 'so_tien', 'dot_id', 'trang_thai'];
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
    getNopTien() {
      NopTienService.getNopTienList()
        .then((json) => this.mapNopTien(json))
        .catch((err) => console.log(err));
    },
    openAddNopTienModal() {
      this.nop_tien = new NopTien(null, '', 0, 0, 0);
      this.add_modal = true;
    },
    addNopTien() {
      NopTienService.addNopTien([this.nop_tien])
        .then(() => {
          this.add_modal = false;
          this.success_modal = true;
        })
        .catch((error) => {
          this.message = `Error: ${error}`;
          this.failed_modal = true;
        });
    },
    addNopTienBulk() {
      NopTienService.addNopTien(this.nop_tien_bulk)
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
    deleteNopTien() {
      const { selected } = this;
      if (selected) {
        this.nop_tien = new NopTien(selected.id, '', 0, 0, 0);
      }
      NopTienService.deteteNopTien(this.nop_tien)
        .then(() => {
          this.success_modal = true;
        })
        .catch((error) => {
          this.message = `Error: ${error}`;
          this.failed_modal = true;
        });
    },
    daNop() {
      const { selected } = this;
      if (selected) {
        this.nop_tien = new NopTien(selected.id, selected.student_id,
          selected.dot_id, selected.so_tien, 1);
      }
      NopTienService.addNopTien([this.nop_tien])
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
    exportCSVFile() {
      const config = {
        delimiter: ',',
        header: true,
      };
      const csv = this.$papa.unparse(this.nop_tien_json, config);
      this.$papa.download(csv, 'nop_tien_list');
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
      this.nop_tien_bulk_text = JSON.stringify(data);
      data.forEach(this.bindCSV);
    },
    bindCSV(value) {
      this.nop_tien_bulk.push(value);
    },
  },
  mounted() { this.getNopTien(); },
};
</script>
