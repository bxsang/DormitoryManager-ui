import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbvue/lib/css/mdb.min.css';
import Vue from 'vue';
import VuePapaParse from 'vue-papa-parse';
import * as mdbvue from 'mdbvue';
import App from './App.vue';
import router from './router';
import store from './store';

for (const component in mdbvue) {
  Vue.component(component, mdbvue[component]);
}
Vue.config.productionTip = false;
Vue.use(VuePapaParse);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
