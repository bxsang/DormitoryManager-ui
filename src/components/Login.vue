<template>
  <div class="login-page">
    <mdb-view>
      <mdb-mask
        overlay="stylish-strong"
        class="d-flex justify-content-center align-items-center"
      >
        <mdb-container>
          <mdb-row>
            <div class="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
              <h1 class="h1-responsive font-weight-bold animated fadeInLeft">
                Hệ thống quản lý <br> Ký túc xá
              </h1>
            </div>
            <div class="col-xl-5 col-lg-6 col-md-10 col-sm-12 mx-auto mt-5 animated fadeInRight">
              <mdb-card id="login-card">
                <mdb-card-body class="z-depth-2 white-text">
                  <form @submit.prevent="handleLogin">
                    <div class="form-header purple-gradient">
                      <h3><i class="fas fa-user mt-2 mb-2" /> Login</h3>
                    </div>
                    <mdb-switch
                      classes="text-center mb-4"
                      off-label="Sinh viên"
                      on-label="Quản lý"
                      v-model="isManager"
                    />
                    <mdb-input
                      label="Tên đăng nhập"
                      label-color="white"
                      icon="user"
                      type="text"
                      v-model="credentials.username"
                    />
                    <mdb-input
                      label="Mật khẩu"
                      label-color="white"
                      icon="lock"
                      type="password"
                      v-model="credentials.password"
                    />
                    <div class="text-center mt-4 black-text">
                      <mdb-btn gradient="purple">
                        Đăng nhập
                      </mdb-btn>
                      <hr>
                      <div class="form-group">
                        <div
                          v-if="message"
                          class="alert alert-danger"
                          role="alert"
                        >
                          {{ message }}
                        </div>
                      </div>
                    </div>
                  </form>
                </mdb-card-body>
              </mdb-card>
            </div>
          </mdb-row>
        </mdb-container>
      </mdb-mask>
    </mdb-view>
  </div>
</template>

<style scoped>
.login-page {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
}

.login-page .view {
  background-image: url("https://dormitory.tdtu.edu.vn/sites/dormitary/files/gva-sliderlayer-upload/2-mhh49q.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100vh;
}

.card {
  background-color: rgba(229, 228, 255, 0.2);
}

.login-page h6 {
  line-height: 1.7;
}

.login-page label {
  color: #fff !important;
}
</style>

<script>
import Credentials from '../models/credentials';

export default {
  name: 'Login',
  data() {
    return {
      credentials: new Credentials('', ''),
      loading: false,
      message: '',
      isManager: this.$store.state.auth.isLastLoginAdmin,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    if (this.loggedIn) {
      if (['admin', 'manager'].includes(this.currentUser.role)) {
        this.$router.push('/ManagerHome');
      } else if (this.currentUser.role === 'student') {
        this.$router.push('/StudentHome');
      } else {
        this.logOut();
      }
    }
    // else {
    //   this.$router.push('/');
    // }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      if (this.credentials.username && this.credentials.password) {
        const data = {
          credentials: this.credentials,
          isManager: this.isManager,
        };
        this.$store.dispatch('auth/login', data).then(
          () => {
            // this.$router.push('/profile');
            if (['admin', 'manager'].includes(this.currentUser.role)) {
              this.$router.push('/ManagerHome');
            } else if (this.currentUser.role === 'student') {
              this.$router.push('/StudentHome');
            }
          },
          (error) => {
            this.loading = false;
            this.message = `${error}`;
          },
        );
      }
    },
    logOut() {
      this.$store.dispatch('auth/logout').then(
        () => {
          this.$router.push('/');
        },
      );
    },
  },
};
</script>
