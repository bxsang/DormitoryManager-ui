<template>
  <div class="home-page">
    <div
      class="view"
      style="height: 100vh"
    >
      <div class="full-bg-img">
        <div class="mask rgba-purple-light">
          <div class="container flex-center">
            <div class="white-text text-center">
              <h2>
                This Navbar is fixed
              </h2>
              <h4>
                It will always stay visible on the top, even when you scroll
                down
              </h4>
              <p>
                Full page intro with background image will be always displayed
                in full screen mode, regardless of device
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="m-5">
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit
      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
      id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
      officia deserunt mollit anim id est laborum.
    </p>
  </div>
</template>

<style scoped>
  .home-page .view {
    background: url("https://mdbootstrap.com/img/Photos/Others/img (40).jpg")
      no-repeat center center;
    background-size: cover;
    height: 100%;
  }
</style>

<script>
export default {
  name: 'ManagerHome',
  mounted() {
    if (!this.$store.state.auth.user || !['admin', 'manager'].includes(this.$store.state.auth.user.role)) {
      this.$router.push('/');
    }
  },
};
</script>
