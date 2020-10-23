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
      if (currentPage === '/Buildings') {
        return 'Quản lý Toà nhà';
      }
      if (currentPage === '/Rooms') {
        return 'Quản lý phòng';
      }
      if (currentPage === '/RoomsArrange') {
        return 'Xếp phòng';
      }
      if (currentPage === '/Attendance') {
        return 'Điểm danh';
      }
      if (currentPage === '/Violations') {
        return 'Quản lý lỗi vi phạm';
      }
      if (currentPage === '/DotThu') {
        return 'Quản lý đợt thu tiền';
      }
      if (currentPage === '/DienNuoc') {
        return 'Quản lý điện nước';
      }
      return '';
    },
  },
};
</script>
