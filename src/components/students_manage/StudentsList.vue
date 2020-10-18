<template>
  <div class="student_list-page">
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
          >Danh sách Sinh viên</a>
          <div>
            <mdb-btn
              outline="white"
              rounded
              size="sm"
              class="px-2"
              @click.native.prevent="getStudentArrangements"
            >
              <em class="fas fa-info mt-0" />
            </mdb-btn>
            <mdb-btn
              outline="white"
              rounded
              size="sm"
              class="px-2"
              @click.native="openAddStudentModal"
            >
              <em class="fas fa-plus mt-0" />
            </mdb-btn>
            <mdb-btn
              outline="white"
              rounded
              size="sm"
              class="px-2"
              @click.native.prevent="openEditStudentModal"
            >
              <em class="fas fa-pencil-alt mt-0" />
            </mdb-btn>
            <mdb-btn
              outline="white"
              rounded
              size="sm"
              class="px-2"
              @click.native.prevent="deleteStudent"
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
                <p>{{ student_arrangements }}</p>
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
                  <em class="fas fa-pencil-alt" /> Thêm sinh viên
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
                  v-model="student.id"
                />
                <mdb-input
                  size="sm"
                  label="Tên"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  v-model="student.name"
                />
                <mdb-input
                  size="sm"
                  label="Mật khẩu"
                  group
                  type="password"
                  validate
                  error="wrong"
                  success="right"
                  v-model="student.password"
                />
                <mdb-input
                  size="sm"
                  label="Quê quán"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  v-model="student.hometown"
                />
                <mdb-input
                  size="sm"
                  label="Quốc tịch"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  v-model="student.nationality"
                />
                <mdb-input
                  size="sm"
                  label="Khoa"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  v-model="student.faculty"
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
                  @click.native.prevent="addStudent"
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
                  <em class="fas fa-pencil-alt" /> Sửa thông tin sinh viên
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
                  v-model="student.id"
                />
                <mdb-input
                  size="sm"
                  label="Tên"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  v-model="student.name"
                />
                <mdb-input
                  size="sm"
                  label="Mật khẩu"
                  group
                  type="password"
                  validate
                  error="wrong"
                  success="right"
                  v-model="student.password"
                />
                <mdb-input
                  size="sm"
                  label="Quê quán"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  v-model="student.hometown"
                />
                <mdb-input
                  size="sm"
                  label="Quốc tịch"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  v-model="student.nationality"
                />
                <mdb-input
                  size="sm"
                  label="Khoa"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  v-model="student.faculty"
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
                  @click.native.prevent="editStudent"
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
                  v-model="students_bulk_text"
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
                  @click.native.prevent="addStudentBulk"
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
import Header from '../Header.vue';
import StudentsManageService from '../../services/students_manage.service';
import Student from '../../models/student';

export default {
  components: {
    Header,
  },
  data() {
    return {
      students_json: null,
      columns: [],
      rows: [],
      selected: null,
      student: new Student('', '', '', '', '', ''),
      message: '',
      info_modal: false,
      add_modal: false,
      edit_modal: false,
      upload_modal: false,
      success_modal: false,
      failed_modal: false,
      students_bulk: [],
      students_bulk_text: '',
      student_arrangements: '',
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
    mapStudents(json) {
      this.students_json = json;
      const keys = ['id', 'name', 'hometown', 'nationality', 'faculty'];
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
    getStudents() {
      StudentsManageService.getStudentsList()
        .then((json) => this.mapStudents(json))
        .catch((err) => console.log(err));
    },
    refreshStudents() {
      this.columns = [];
      this.rows = [];
      this.getStudents();
    },
    openAddStudentModal() {
      this.student = new Student('', '', '', '', '', '');
      this.add_modal = true;
    },
    openEditStudentModal() {
      const { selected } = this;
      if (selected) {
        this.student = new Student(selected.id, selected.name,
          selected.password, selected.hometown, selected.nationality, selected.faculty);
        this.edit_modal = true;
      }
    },
    addStudent() {
      StudentsManageService.addStudent(this.student)
        .then(() => {
          this.add_modal = false;
          this.success_modal = true;
          this.refreshStudents();
        })
        .catch((error) => {
          this.message = `Error: ${error}`;
          this.failed_modal = true;
        });
    },
    addStudentBulk() {
      StudentsManageService.addStudentBulk(this.students_bulk)
        .then(() => {
          this.add_modal = false;
          this.success_modal = true;
          this.refreshStudents();
        })
        .catch((error) => {
          this.message = `Error: ${error}`;
          this.failed_modal = true;
        });
    },
    editStudent() {
      StudentsManageService.editStudent(this.student)
        .then(() => {
          this.edit_modal = false;
          this.success_modal = true;
          this.refreshStudents();
        })
        .catch((error) => {
          this.message = `Error: ${error}`;
          this.failed_modal = true;
        });
    },
    deleteStudent() {
      const { selected } = this;
      if (selected) {
        this.student = new Student(selected.id, selected.name,
          selected.password, selected.hometown, selected.nationality, selected.faculty);
      }
      StudentsManageService.deteteStudent(this.student)
        .then(() => {
          this.success_modal = true;
          this.refreshStudents();
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
      const csv = this.$papa.unparse(this.students_json, config);
      this.$papa.download(csv, 'student_list');
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
      this.students_bulk_text = JSON.stringify(data);
      data.forEach(this.bindCSV);
    },
    bindCSV(value) {
      this.students_bulk.push(value);
    },
    getStudentArrangements() {
      const { selected } = this;
      if (selected) {
        this.student = new Student(selected.id, selected.name,
          selected.password, selected.hometown, selected.nationality, selected.faculty);
      }
      StudentsManageService.getStudentArrangements(this.student)
        .then((response) => {
          this.student_arrangements = '';
          for (const arrangement of response) {
            this.student_arrangements += `${arrangement.semeter_name}: ${arrangement.room_name}`;
          }
          this.info_modal = true;
        })
        .catch((error) => {
          this.message = `Error: ${error}`;
          this.failed_modal = true;
        });
    },
  },
  mounted() { this.getStudents(); },
};
</script>
