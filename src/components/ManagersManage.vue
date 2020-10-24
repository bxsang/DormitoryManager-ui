<template>
  <div class="managers_manage_page">
    <Header />
    <mdb-container
      class="pt-5"
    >
      <div class="card card-cascade narrower">
        <!--Card image-->
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
          >Danh sách quản lý</a>
          <div>
            <mdb-btn
              outline="white"
              rounded
              size="sm"
              class="px-2"
              @click.native="openAddManagerModal"
            >
              <em class="fas fa-plus mt-0" />
            </mdb-btn>
            <mdb-btn
              outline="white"
              rounded
              size="sm"
              class="px-2"
              @click.native.prevent="openEditManagerModal"
            >
              <em class="fas fa-pencil-alt mt-0" />
            </mdb-btn>
            <mdb-btn
              outline="white"
              rounded
              size="sm"
              class="px-2"
              @click.native.prevent="deleteManager"
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
                  <em class="fas fa-pencil-alt" /> Thêm tài khoản quản lý
                </h4>
              </mdb-modal-header>
              <mdb-modal-body class="grey-text">
                <mdb-input
                  size="sm"
                  label="Tên"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  v-model="manager.name"
                />
                <mdb-input
                  size="sm"
                  label="Email"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  v-model="manager.email"
                />
                <mdb-input
                  size="sm"
                  label="Tên tài khoản"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  v-model="manager.username"
                />
                <mdb-input
                  size="sm"
                  label="Mật khẩu"
                  group
                  type="password"
                  validate
                  error="wrong"
                  success="right"
                  v-model="manager.password"
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
                  @click.native.prevent="addManager"
                >
                  Thêm
                </mdb-btn>
              </mdb-modal-footer>
            </mdb-modal>
            <mdb-modal
              :show="edit_modal"
              @close="edit_modal = false"
              cascade
              class="text-left"
            >
              <mdb-modal-header class="primary-color white-text">
                <h4 class="title">
                  <em class="fas fa-pencil-alt" /> Sửa thông tin quản lý
                </h4>
              </mdb-modal-header>
              <mdb-modal-body class="grey-text">
                <mdb-input
                  size="sm"
                  label="Tên"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  v-model="manager.name"
                />
                <mdb-input
                  size="sm"
                  label="Email"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  v-model="manager.email"
                />
                <mdb-input
                  size="sm"
                  label="Tên tài khoản"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  v-model="manager.username"
                />
                <mdb-input
                  size="sm"
                  label="Mật khẩu"
                  group
                  type="password"
                  validate
                  error="wrong"
                  success="right"
                  v-model="manager.password"
                />
              </mdb-modal-body>
              <mdb-modal-footer>
                <mdb-btn
                  color="secondary"
                  @click.native="edit_modal = false"
                >
                  Đóng
                </mdb-btn>
                <mdb-btn
                  color="primary"
                  @click.native.prevent="editManager"
                >
                  Sửa
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
                  class="form-control"
                  rows="3"
                  v-model="managers_bulk_text"
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
                  @click.native.prevent="addManagerBulk"
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
        <!--/Card image-->
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
import Manager from '../models/manager';
import ManagersManageService from '../services/managers_manage';

export default {
  components: {
    Header,
  },
  data() {
    return {
      managers_json: null,
      columns: [],
      rows: [],
      selected: null,
      manager: new Manager('', '', '', ''),
      message: '',
      add_modal: false,
      edit_modal: false,
      upload_modal: false,
      success_modal: false,
      failed_modal: false,
      managers_bulk: [],
      managers_bulk_text: '',
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
    mapManagers(json) {
      this.managers_json = json;
      const keys = ['id', 'name', 'username', 'email', 'role', 'created_date'];
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
    getManagers() {
      ManagersManageService.getManagersList()
        .then((json) => this.mapManagers(json.result))
        .catch((err) => console.log(err));
    },
    refreshManagers() {
      this.columns = [];
      this.rows = [];
      this.getManagers();
    },
    openAddManagerModal() {
      this.manager = new Manager('', '', '', '');
      this.add_modal = true;
    },
    openEditManagerModal() {
      const { selected } = this;
      if (selected) {
        this.manager = new Manager(selected.name, selected.email, selected.username, null);
        this.edit_modal = true;
      }
    },
    addManager() {
      ManagersManageService.addManager(this.manager)
        .then(() => {
          this.add_modal = false;
          this.success_modal = true;
          this.refreshManagers();
        })
        .catch((error) => {
          this.message = `Error: ${error}`;
          this.failed_modal = true;
        });
    },
    addManagerBulk() {
      ManagersManageService.addManagerBulk(this.managers_bulk)
        .then(() => {
          this.add_modal = false;
          this.success_modal = true;
          this.refreshManagers();
        })
        .catch((error) => {
          this.message = `Error: ${error}`;
          this.failed_modal = true;
        });
    },
    editManager() {
      ManagersManageService.editManager(this.manager)
        .then(() => {
          this.edit_modal = false;
          this.success_modal = true;
          this.refreshManagers();
        })
        .catch((error) => {
          this.message = `Error: ${error}`;
          this.failed_modal = true;
        });
    },
    deleteManager() {
      const { selected } = this;
      if (selected) {
        this.manager = new Manager(selected.name, selected.email, selected.username, null);
      }
      ManagersManageService.deteteManager(this.manager)
        .then(() => {
          this.success_modal = true;
          this.refreshManagers();
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
      const csv = this.$papa.unparse(this.managers_json, config);
      this.$papa.download(csv, 'manager_list');
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
      this.managers_bulk_text = JSON.stringify(data);
      data.forEach(this.bindCSV);
    },
    bindCSV(value) {
      this.managers_bulk.push(value);
    },
  },
  mounted() { this.getManagers(); },
};
</script>
