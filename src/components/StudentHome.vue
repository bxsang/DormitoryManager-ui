<template>
  <div class="student_home_page">
    <Header />
    <mdb-container
      class="pt-5"
    >
      <h2>Danh sách phòng</h2>
      <p v-html="arrangement_html" />
      <h2>Danh sách lỗi</h2>
      <p v-html="violations_html" />
      <h2>Danh sách các khoản tiền phải nộp</h2>
      <p v-html="finance_html" />
    </mdb-container>
  </div>
</template>

<script>
import Header from './Header.vue';
import StudentsManageService from '../services/students_manage.service';
import Student from '../models/student';

export default {
  name: 'StudentHome',
  components: {
    Header,
  },
  data() {
    return {
      student: new Student(this.$store.state.auth.user.id, null, null, null, null, null),
      message: '',
      arrangement_html: '',
      violations_html: '',
      finance_html: '',
    };
  },
  methods: {
    getStudentArrangements() {
      StudentsManageService.getStudentArrangements(this.student)
        .then((response) => {
          for (const arrangement of response) {
            this.arrangement_html += `${arrangement.semeter_name}: ${arrangement.room_name}<br>`;
          }
          this.info_modal = true;
        })
        .catch((error) => {
          this.message = `Error: ${error}`;
          this.failed_modal = true;
        });
    },
    getStudentViolations() {
      StudentsManageService.getStudentViolations(this.student)
        .then((response) => {
          for (const violation of response) {
            this.violations_html += `Lỗi: ${violation.message}, HK: ${violation.semeter_name}<br>`;
          }
          this.info_modal = true;
        })
        .catch((error) => {
          this.message = `Error: ${error}`;
          this.failed_modal = true;
        });
    },
    getStudentFinance() {
      StudentsManageService.getStudentFinance(this.student)
        .then((response) => {
          for (const fn of response) {
            this.finance_html += `Đợt ${fn.dot_id}, số tiền: ${fn.so_tien}, trạng thái:  ${fn.trang_thai}<br>`;
          }
          this.info_modal = true;
        })
        .catch((error) => {
          this.message = `Error: ${error}`;
          this.failed_modal = true;
        });
    },
  },
  mounted() {
    if (!this.$store.state.auth.user || this.$store.state.auth.user.role !== 'student') {
      this.$router.push('/');
    }
    this.getStudentArrangements();
    this.getStudentViolations();
    this.getStudentFinance();
  },
};
</script>
