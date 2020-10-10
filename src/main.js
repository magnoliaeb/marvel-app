import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { auth } from './fb'
Vue.config.productionTip = false;

let app
auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }

  if (user) {
    store.dispatch("fetchUser", user);
    console.log('existe un usaurio')
    // console.log(user);
  } else {
    console.log('no existe un usaurio')
    
  }
})