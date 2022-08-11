import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/students",
      name: "students",
      component: () => import("./components/Students/Index")
    },
    {
      path: "/student/add",
      name: "add",
      component: () => import("./components/Students/Add")
    },
    {
      path: "/student/edit/:id",
      name: "edit-student",
      component: () => import("./components/Students/Edit")
    }
  ]
});