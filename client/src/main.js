import Vue from 'vue'
import App from './App.vue'
import Argon from '@/plugins/argon-kit'
Vue.use(Argon);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
