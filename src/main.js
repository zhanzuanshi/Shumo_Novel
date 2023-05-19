import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import 'element-ui/lib/theme-chalk/index.css';
// 按需引入vant
import './pugins/vant'
// 按需引入element
import './pugins/element'
Vue.config.productionTip = false;
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
