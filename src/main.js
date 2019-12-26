import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./views/icon.css";

Vue.config.productionTip = false;

Vue.use(Element);

// 登录验证以及标题设置
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  let userInfo = localStorage.getItem("userInfo");
  if (to.name != "login") {
    if (!userInfo) {
      router.push("/");
      return;
    }
  } else {
    if (userInfo) {
      router.push("/set");
      return;
    }
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
