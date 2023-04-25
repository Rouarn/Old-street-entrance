import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//引入axios
import axios from "axios";

//配置axios
Vue.prototype.axios = axios;
axios.defaults.baseURL = "http://ljk.xinlian.pub/:9898";

//安装配置vant
import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);

//引入iconfont
import "./assets/iconfont/iconfont.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
