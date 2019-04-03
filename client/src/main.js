import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import router from './router'
import Vuetify from 'vuetify'
import '@/assets/css/main.css'
import VueAxios from 'vue-axios'
import axios from 'axios'
import { sync } from 'vuex-router-sync'
import VModal from 'vue-js-modal'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

Vue.use(VueAxios, axios)
Vue.use(Vuetify)
Vue.use(VuePlyr)
Vue.use(VModal)

sync(store, router)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
