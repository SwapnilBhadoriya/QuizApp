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

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/register", component: SignUp },
  { path: "/login", component: Login },
  { path: "/admin/create", component: AdminQuiz },
  { path: "/admin/manage", component: AdminManage },
  { path: "/admin/manage/:quizId", component: EditQuiz },
  { path: "/admin", component: AdminHome },
  { path: "/user/:id", component: UserHome },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
