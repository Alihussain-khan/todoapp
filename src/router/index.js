import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/auth";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      beforeEnter: (to, from) => {
        // window.localStorage.removeItem("token");
        console.log("atleast this part works");
        return false;
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/todo",
      name: "todo",
      component: () => import("../views/TodoView.vue"),
      meta: { needsauth: "true" },
    },
    {
      path: "/update",
      name: "update",
      component: () => import("../views/UpdateTodoView.vue"),
      meta: { needsauth: "true" },
    },
    {
      path: "/update/:id",
      name: "update",
      component: () => import("../views/UpdateTodoView.vue"),
      meta: { needsauth: "true" },
    },
    {
      path: "/create",
      name: "create",
      component: () => import("../views/CreateTodoView.vue"),
      meta: { needsauth: "true" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem("todotoken");
  if (token) {
    store.state.isloggedin = true;
  }
  if (!token && to.meta.needsauth) {
    next("/login");
  } else {
    next();
  }
});

export default router;
