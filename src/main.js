import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'
import Print from 'vue-print-nb'
import htmlToPdf from '@/js/pdf'
import doprint from '@/js/hpdf'
import unchangeweb from '@/js/unchangeweb'
import getPdf from '@/js/lodpdf'
Vue.use(getPdf)
Vue.use(unchangeweb)
Vue.use(doprint)
Vue.use(htmlToPdf)
 
Vue.use(Print);
Vue.prototype.$axios=axios
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
