// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import {Button,Popup,DatetimePicker } from 'mint-ui';


Vue.config.productionTip = false
Vue.component(Popup.name, Popup);
Vue.component(Button.name, Button);
Vue.component(DatetimePicker.name, DatetimePicker);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
