import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/students",
      name: "students",
      component: () => import("./components/TableComponent")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddStudent")
    }
  ]
});