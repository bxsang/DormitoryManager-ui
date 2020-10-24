<template>
  <div class="profile-page">
    <Header />
    <div
      class="view pt-5"
      id="profile_view"
      style="height: 100vh"
    >
      <div class="container flex-center">
        <div class="text-center">
          <mdb-card wide>
            <mdb-view
              hover
              cascade
            >
              <a href="#">
                <mdb-card-image
                  src="https://mdbootstrap.com/img/Photos/Others/photo6.jpg"
                  alt="Card image cap"
                />
                <mdb-mask
                  flex-center
                  waves
                  overlay="white-slight"
                />
              </a>
            </mdb-view>
            <mdb-card-body
              class="text-center pb-0"
              cascade
            >
              <mdb-card-title><strong>{{ info.name }}</strong></mdb-card-title>
              <h5 class="blue-text">
                <strong>{{ info.role }}</strong>
              </h5>
              <mdb-card-text v-html="info_text" />
              <a class="icons-sm li-ic"><mdb-icon
                fab
                icon="linkedin"
              /></a>
              <a class="icons-sm tw-ic"><mdb-icon
                fab
                icon="twitter"
              /></a>
              <a class="icons-sm fb-ic"><mdb-icon
                fab
                icon="facebook"
              /></a>
            </mdb-card-body>
          </mdb-card>
          <mdb-btn
            class="my-5"
            gradient="peach"
            rounded
            @click.native="edit_manager_modal = true"
          >
            Sửa thông tin
          </mdb-btn>
        </div>
      </div>
    </div>
    <mdb-modal
      :show="edit_manager_modal"
      @close="edit_manager_modal = false"
      cascade
      class="text-left"
    >
      <mdb-modal-header class="primary-color white-text">
        <h4 class="title">
          <em class="fas fa-pencil-alt" /> Sửa thông tin
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
          @click.native="openEditModal"
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
import AuthService from '../services/auth.service';
import Manager from '../models/manager';
import Student from '../models/student';
import ManagersManageService from '../services/managers_manage';

export default {
  name: 'Profile',
  components: {
    Header,
  },
  data() {
    return {
      info: '',
      info_text: '',
      manager: new Manager('', '', '', ''),
      student: new Student('', '', '', '', '', ''),
      edit_manager_modal: false,
      edit_student_modal: false,
      success_modal: false,
      failed_modal: false,
    };
  },
  mounted() {
    if (!this.$store.state.auth.user) {
      this.$router.push('/');
    }
    AuthService.getInfo()
      .then((response) => {
        this.info = response;
        if (response.role) {
          this.manager = new Manager(response.name, response.email, response.username, null);
          this.info_text = `Tên tài khoản: ${response.username}<br>Email: ${response.email}<br>Ngày tạo: ${response.created_date}`;
        } else {
          this.info.role = 'student';
          this.student = new Student(response.id, response.name, null, response.hometown,
            response.nationality, response.faculty);
          this.info_text = `MSSV: ${response.id}<br>Khoa: ${response.faculty}<br>Quốc tịch: ${response.nationality}<br>Quê quán: ${response.hometown}<br>Ngày tạo: ${response.created_date}`;
        }
      })
      .catch((error) => {
        this.info = `Error: ${error}`;
      });
  },
  methods: {
    openEditModal() {
      if (this.info.role === 'manager' || this.info.role === 'admin') {
        this.edit_manager_modal = true;
      } else {
        this.edit_student_modal = true;
      }
    },
    editManager() {
      ManagersManageService.editManager(this.manager)
        .then(() => {
          this.edit_manager_modal = false;
          this.success_modal = true;
          this.refreshManagers();
        })
        .catch((error) => {
          this.message = `Error: ${error}`;
          this.failed_modal = true;
        });
    },
  },
};
</script>
