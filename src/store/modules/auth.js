import AuthService from '../../services/auth.service';

const login = JSON.parse(localStorage.getItem('login'));
function getIsLastLoginAdmin() {
  return localStorage.getItem('isLastLoginAdmin') === 'true';
}
const initialState = login
  ? { status: { loggedIn: true }, user: login.user, isLastLoginAdmin: getIsLastLoginAdmin() }
  : { status: { loggedIn: false }, user: null, isLastLoginAdmin: getIsLastLoginAdmin() };

export default {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, data) {
      return AuthService.login(data).then(
        (response) => {
          commit('loginSuccess', response.user);
          return Promise.resolve(response);
        },
        (error) => {
          commit('loginFailure');
          return Promise.reject(error);
        },
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
      state.isLastLoginAdmin = getIsLastLoginAdmin();
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
      state.isLastLoginAdmin = getIsLastLoginAdmin();
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
      state.isLastLoginAdmin = getIsLastLoginAdmin();
    },
  },
};
