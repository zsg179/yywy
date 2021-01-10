// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
//桌面端适配
import '@vant/touch-emulator';
// vant组件库
import { Cell, CellGroup,Toast,Button,Dialog,Tab,Tabs,Stepper,
Picker,Popup,Field,RadioGroup, Radio,ShareSheet,Overlay} from 'vant';
Vue.use(Cell).use(CellGroup).use(Toast).use(Button).use(Dialog)
.use(Tab).use(Tabs).use(Stepper).use(Picker).use(Popup).use(Field)
.use(RadioGroup).use(Radio).use(ShareSheet).use(Overlay)

Vue.prototype.$axios = axios
Vue.prototype.$toast = Toast
Vue.config.productionTip = false

//axios.defaults.baseURL = "http://localhost:8022"
axios.defaults.baseURL = "http://pensionlife.95522.cn/szyl_vote/"
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
