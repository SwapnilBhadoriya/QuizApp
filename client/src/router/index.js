import Vue from "vue";
import VueRouter from "vue-router";
import AdminQuiz from "../views/AdminQuiz.vue";
import AdminManage from "../views/AdminManage.vue";
import EditQuiz from "../views/EditQuiz.vue";
import AdminHome from "../views/AdminHome.vue";
import Home from "../views/Home.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import UserHome from "../views/User.vue";
import Unauthorised from "../views/Unauthorised.vue";

import user from "../services/user";
import admin from "@/services/admin";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/register", component: SignUp },
  { path: "/login", component: Login },
  {
    path: "/admin",
    component: AdminHome,
    beforeEnter: function (to, from, next) {
      admin
        .getQuizzes()
        .then((response) => {
          next();
        })
        .catch((error) => {
          localStorage.clear();
          next("/unauthorised");
        });
    },
  },
  { path: "/admin/create", component: AdminQuiz },
  { path: "/admin/manage", component: AdminManage },
  { path: "/admin/manage/:quizId", component: EditQuiz },

  {
    path: "/user/:id",
    component: UserHome,
    beforeEnter: function (to, from, next) {
      user
        .getQuizzes(to.params.id)
        .then((response) => {
          if (response.data.success) {
            next();
          }
        })
        .catch((error) => {
          next("/unauthorised");
        });
    },
  },
  { path: "/unauthorised", component: Unauthorised },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
