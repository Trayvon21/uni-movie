import Vue from "vue";
import App from "./App";
import dayjs from "dayjs";
import api from "./http/api.js";
Vue.config.productionTip = false;

Vue.prototype.$api = api;
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$gotoView = url => {
  uni.navigateTo({
    url: `/pages/view/view?url=${url}`
  });
};


App.mpType = "app";

const app = new Vue({
  ...App
});
app.$mount();
