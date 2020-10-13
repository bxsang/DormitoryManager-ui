<template>
  <div class="about-page">
    <mdb-carousel
      :items="items"
      controlls
      indicators
      :interval="5000"
    />
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

<script>
export default {
  data() {
    return {
      items: [
        {
          img: true,
          src:
            'https://dormitory.tdtu.edu.vn/sites/dormitary/files/gva-sliderlayer-upload/1-jx4thv.jpg',
        },
        {
          img: true,
          src:
            'https://dormitory.tdtu.edu.vn/sites/dormitary/files/gva-sliderlayer-upload/2-mhh49q.jpg',
        },
        {
          img: true,
          src:
            'https://dormitory.tdtu.edu.vn/sites/dormitary/files/gva-sliderlayer-upload/sample-k9eye6.JPG',
        },
        {
          img: true,
          src:
            'https://dormitory.tdtu.edu.vn/sites/dormitary/files/gva-sliderlayer-upload/KTX%20m%E1%BB%9Bi%20%C4%91%C3%AAm-5xzlt2.JPG',
        },
      ],
    };
  },
};
</script>
