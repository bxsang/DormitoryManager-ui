<template>
  <div class="profile-page">
    <div
      class="view"
      id="profile_view"
      style="height: 100vh"
    >
      <div class="full-bg-img">
        <div class="mask rgba-purple-light">
          <div class="container flex-center">
            <div class="white-text text-center">
              <h2>
                Xin chào
              </h2>
              <h4>
                {{ content }}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '../services/auth.service';

export default {
  name: 'Profile',
  data() {
    return {
      content: '',
    };
  },
  mounted() {
    if (!this.$store.state.auth.user) {
      this.$router.push('/');
    }
    AuthService.getInfo()
      .then((response) => {
        this.content = response;
      })
      .catch((error) => {
        this.content = `Error: ${error}`;
      });
  },
};
</script>

<style scoped>
  .profile-page .view {
    background: url("https://dormitory.tdtu.edu.vn/sites/dormitary/files/gva-sliderlayer-upload/sample-k9eye6.JPG")
      no-repeat center center;
    background-size: cover;
    height: 100%;
  }
</style>
