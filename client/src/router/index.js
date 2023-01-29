import Vue from "vue";
import VueRouter from "vue-router";
import AdminQuiz from "../views/AdminQuiz.vue";
import AdminHome from "../views/AdminHome.vue";
import Home from "../views/Home.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/register", component: SignUp },
  { path: "/login", component: Login },
  { path: "/admin/create", component: AdminQuiz },
  { path: "/admin", component: AdminHome },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
