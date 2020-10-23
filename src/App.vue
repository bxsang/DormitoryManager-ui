<template>
  <div>
    <header>
      <mdb-navbar
        position="top"
        dark
        transparent
        scrolling
      >
        <mdb-navbar-brand href="#">
          <strong>KTX</strong>
        </mdb-navbar-brand>
        <mdb-navbar-toggler>
          <mdb-navbar-nav left>
            <mdb-nav-item
              waves-fixed
              active
              router
              to="/"
            >
              Trang chủ
            </mdb-nav-item>
            <mdb-dropdown
              tag="li"
              class="nav-item"
              v-if="isManager"
            >
              <mdb-dropdown-toggle
                tag="a"
                nav-link
                slot="toggle"
                waves-fixed
                v-if="isManager"
              >
                Sinh viên
              </mdb-dropdown-toggle>
              <mdb-dropdown-menu>
                <mdb-dropdown-item
                  router
                  to="/StudentsList"
                >
                  Danh sách
                </mdb-dropdown-item>
                <mdb-dropdown-item
                  router
                  to="/Attendance"
                >
                  Điểm danh
                </mdb-dropdown-item>
                <mdb-dropdown-item
                  router
                  to="/Violations"
                >
                  Lỗi vi phạm
                </mdb-dropdown-item>
              </mdb-dropdown-menu>
            </mdb-dropdown>
            <mdb-dropdown
              tag="li"
              class="nav-item"
              v-if="isManager"
            >
              <mdb-dropdown-toggle
                tag="a"
                nav-link
                slot="toggle"
                waves-fixed
              >
                Phòng
              </mdb-dropdown-toggle>
              <mdb-dropdown-menu>
                <mdb-dropdown-item
                  router
                  to="/Buildings"
                >
                  QL toà nhà
                </mdb-dropdown-item>
                <mdb-dropdown-item
                  router
                  to="/Rooms"
                >
                  QL phòng
                </mdb-dropdown-item>
                <mdb-dropdown-item
                  router
                  to="/RoomsArrange"
                >
                  Xếp phòng
                </mdb-dropdown-item>
                <mdb-dropdown-item>Phân công trực phòng</mdb-dropdown-item>
              </mdb-dropdown-menu>
            </mdb-dropdown>
            <mdb-dropdown
              tag="li"
              class="nav-item"
              v-if="isManager"
            >
              <mdb-dropdown-toggle
                tag="a"
                nav-link
                slot="toggle"
                waves-fixed
              >
                Tài chính
              </mdb-dropdown-toggle>
              <mdb-dropdown-menu>
                <mdb-dropdown-item
                  router
                  to="/DotThu"
                >
                  Đợt thu
                </mdb-dropdown-item>
                <mdb-dropdown-item
                  router
                  to="/DienNuoc"
                >
                  Điện nước
                </mdb-dropdown-item>
                <mdb-dropdown-item
                  router
                  to="/NopTien"
                >
                  Nộp tiền
                </mdb-dropdown-item>
              </mdb-dropdown-menu>
            </mdb-dropdown>
            <mdb-nav-item
              waves-fixed
              router
              to="/Semeters"
              v-if="isManager"
            >
              QL Học kỳ
            </mdb-nav-item>
            <mdb-nav-item
              waves-fixed
              router
              to="/about"
              v-if="isAdmin"
            >
              QL tài khoản
            </mdb-nav-item>
            <mdb-nav-item
              waves-fixed
              router
              to="/about"
            >
              About
            </mdb-nav-item>
          </mdb-navbar-nav>
          <mdb-navbar-nav right>
            <mdb-select
              v-model="semeters"
              placeholder="Học kỳ"
              label=""
              @change="onSemeterChange($event)"
              v-if="currentUser"
            />
            <mdb-nav-item
              waves-fixed
              router
              to="/profile"
              v-if="currentUser"
            >
              <mdb-icon icon="user-alt" />{{ currentUser.name }}
            </mdb-nav-item>
            <mdb-nav-item
              waves-fixed
              router
              to="/"
              v-if="!currentUser"
            >
              <a class="nav-link"><mdb-icon icon="sign-in-alt" />Login</a>
            </mdb-nav-item>
            <mdb-nav-item
              @click.native="logOut"
              waves-fixed
              v-else
            >
              <mdb-icon
                icon="sign-out-alt"
                class="clickable-icon"
              />LogOut
            </mdb-nav-item>
          </mdb-navbar-nav>
        </mdb-navbar-toggler>
      </mdb-navbar>
    </header>
    <main>
      <router-view />
    </main>
    <mdb-btn-fixed
      @click.native.prevent="pageUp"
      color="blue"
      icon="arrow-up"
      size="lg"
      :bottom="30"
      :right="105"
    />
  </div>
</template>

<style>
  .navbar {
    transition: background .5s ease-in-out,padding .5s ease-in-out;
  }

  .navbar .md-form {
    margin: 0;
  }

  .top-nav-collapse {
    background-color: #424f95 !important;
  }

  @media (max-width: 768px) {
  .navbar:not(.top-nav-collapse) {
    background: #424f95 !important;
  }
}
</style>

<script>
import SemesterService from './services/semester';

export default {
  data() {
    return {
      semeters: [],
      currentSemeter: localStorage.getItem('semeter'),
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      if (this.currentUser) {
        return this.currentUser.role === 'admin';
      }
      return false;
    },
    isManager() {
      // eslint-disable-next-line max-len
      // return ['/ManagerHome', '/StudentHome', '/StudentHome', '/profile', '/sidebar'].includes(this.$route.path);
      // return this.$store.state.auth.user.role === 'admin';
      if (this.currentUser) {
        return ['admin', 'manager'].includes(this.currentUser.role);
      }
      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout').then(
        () => {
          this.$router.push('/');
        },
      );
    },
    toggleSlim() {
      this.collapsed = !this.collapsed;
    },
    pageUp() {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    },
    getSemeters() {
      SemesterService.getSemeterList()
        .then((response) => this.mapSemeters(response))
        .catch((err) => console.log(err));
    },
    mapSemeters(semeters) {
      for (const semeter in semeters) {
        const semeterName = semeters[semeter].name;
        this.semeters.push({
          text: semeterName,
          value: semeterName,
          selected: semeterName === this.currentSemeter,
        });
      }
    },
    onSemeterChange(event) {
      this.currentSemeter = event;
      localStorage.setItem('semeter', event);
    },
  },
  mounted() { this.getSemeters(); },
};
</script>
