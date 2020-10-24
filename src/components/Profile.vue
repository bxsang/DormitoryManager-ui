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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';
import AuthService from '../services/auth.service';

export default {
  name: 'Profile',
  components: {
    Header,
  },
  data() {
    return {
      info: null,
      info_text: '',
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
          this.info_text = `Tên tài khoản: ${response.username}<br>Email: ${response.email}<br>Ngày tạo: ${response.created_date}`;
        } else {
          this.info.role = 'student';
          this.info_text = `MSSV: ${response.id}<br>Khoa: ${response.faculty}<br>Quốc tịch: ${response.nationality}<br>Quê quán: ${response.hometown}<br>Ngày tạo: ${response.created_date}`;
        }
      })
      .catch((error) => {
        this.info = `Error: ${error}`;
      });
  },
};
</script>
