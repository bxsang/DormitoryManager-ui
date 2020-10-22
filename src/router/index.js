/* eslint-disable camelcase */
import Vue from 'vue';
import VueRouter from 'vue-router';
import ManagerHome from '@/components/ManagerHome.vue';
import StudentHome from '@/components/StudentHome.vue';
import Login from '@/components/Login.vue';
import Profile from '@/components/Profile.vue';
import Sidebar from '@/components/Sidebar.vue';

import StudentsList from '@/components/students_manage/StudentsList.vue';
import Semeters from '@/components/Semeters.vue';
import Buildings from '@/components/Buildings.vue';
import Rooms from '@/components/Rooms.vue';
import RoomsArrange from '@/components/RoomsArrange.vue';
import Attendance from '@/components/Attendance.vue';
import Violations from '@/components/Violations.vue';
import DotThu from '@/components/DotThu.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/ManagerHome',
    name: 'ManagerHome',
    component: ManagerHome,
  },
  {
    path: '/StudentHome',
    name: 'StudentHome',
    component: StudentHome,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/sidebar',
    name: 'Sidebar',
    component: Sidebar,
  },
  {
    path: '/StudentsList',
    name: 'StudentsList',
    component: StudentsList,
  },
  {
    path: '/Semeters',
    name: 'Semeters',
    component: Semeters,
  },
  {
    path: '/Buildings',
    name: 'Buildings',
    component: Buildings,
  },
  {
    path: '/Rooms',
    name: 'Rooms',
    component: Rooms,
  },
  {
    path: '/RoomsArrange',
    name: 'RoomsArrange',
    component: RoomsArrange,
  },
  {
    path: '/Attendance',
    name: 'Attendance',
    component: Attendance,
  },
  {
    path: '/Violations',
    name: 'Violations',
    component: Violations,
  },
  {
    path: '/DotThu',
    name: 'DotThu',
    component: DotThu,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/components/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
