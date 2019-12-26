import Vue from "vue";
import Router from "vue-router";
import Title from "./views/title/title";
import Bull from "./views/bull/bull";
import Print from "./views/print/print";
import Monitoring from "./views/monitoring/monitoring";
import Set from "./views/set/set";
import Clientele from "./views/clientele/clientele";
import Clienteles from "./views/clientele/clienteles";
import Admins from "./views/admins/admins";
import Admins2 from "./views/admins/admins2";
import Login from "./views/login/login";
import Register from "./views/register/register";
import Welcome from "./views/welcome/welcome";


Vue.use(Router);

export default new Router({
  mode: "history",
  base: '/vip',
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      meta: { title: "登录", roles: ["admin", "user"] }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: { title: "注册", roles: ["admin", "user"] }
    },
    {
      path: "/",
      name: "title",
      component: Title,
      children: [
        {
          path: "welcome",
          name: "welcome",
          component: Welcome,
          meta: { title: "欢迎来到后台管理系统", roles: ["admin"] }
        },
        {
          path: "bull",
          name: "bull",
          component: Bull,
          meta: { title: "账单" }
        },
        {
          path: "print",
          name: "print",
          component: Print,
          meta: { title: "物流监控" }
        },
        {
          path: "monitoring",
          name: "monitoring",
          component: Monitoring,
          meta: { title: "订单" }
        },
        { path: "set", name: "set", component: Set, meta: { title: "工具箱" } },
        {
          path: "clientele",
          name: "clientele",
          component: Clientele,
          meta: { title: "客户开户" }
        },
        {
          path: "clienteles",
          name: "clienteles",
          component: Clienteles,
          meta: { title: "客户信息" }
        },
        {
          path: "admins",
          name: "admins",
          component: Admins,
          meta: { title: "开户" }
        },
        {
          path: "admins2",
          name: "admins2",
          component: Admins2,
          meta: { title: "用户信息" }
        },
      ]
    }
  ]
});
