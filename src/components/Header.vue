<template>
  <div
    class="view purple-gradient"
    style="height: 40vh"
  >
    <div class="full-bg-img">
      <div class="mask rgba-purple-light">
        <div class="container flex-center">
          <div class="white-text text-center">
            <h1><strong>{{ text }}</strong></h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    text() {
      const currentPage = this.$route.path;
      if (currentPage === '/StudentsList') {
        return 'Quản lý sinh viên';
      }
      if (currentPage === '/Semeters') {
        return 'Quản lý học kỳ';
      }
      return '';
    },
  },
};
</script>
