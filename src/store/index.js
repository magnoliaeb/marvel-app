import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from '../fb'
import charactersModule from './moduls/charactes'
import comicsModule from './moduls/comics'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      isLogged: null,
      profile: null
    },
  },
  getters: {
    getUser(state) {
      return state.user
    },
    

  },
  mutations: {
   
    SET_USER_PROFILE(state, user) {
      state.user.profile = user
    },
    SET_IS_LOGGED(state, value) {
      state.user.isLogged = value
    },

  },
  actions: {
    fetchUser({ commit }, user) {
      commit('SET_IS_LOGGED', user !== null);
      if (user) {
        commit('SET_USER_PROFILE', {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        });
      } else {
        commit('SET_USER_PROFILE', null);
      }
    },
    async registerUser({ dispatch }, credencials) {
      const {email, password, name, lastname } = credencials
      const { user } = await auth.createUserWithEmailAndPassword(email, password)
      await auth.currentUser.updateProfile({
        displayName: `${name} ${lastname}`
      })
      dispatch('fetchUser', user)
      
    },
    
    async loginUser( {dispatch }, credencials) {
      const {email, password } = credencials
      const {user} = await auth.signInWithEmailAndPassword(email, password)
      dispatch('fetchUser', user)
    },

    async logutUser({ commit }) {
      await auth.signOut()
      commit('SET_USER_PROFILE', {});
      commit('SET_IS_LOGGED', null);

    }
  },
  modules: {
    characters: charactersModule,
    comics: comicsModule,
  
  }
});
