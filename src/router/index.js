import { createRouter, createWebHistory } from "vue-router";
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
    },
    {
      path: "/update",
      name: "update",
      component: () => import("../views/UpdateTodoView.vue"),
    },
    {
      path: "/update/:id",
      name: "update",
      component: () => import("../views/UpdateTodoView.vue"),
    },
    {
      path: "/create",
      name: "create",
      component: () => import("../views/CreateTodoView.vue"),
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   store.state.token = window.localStorage.getItem("token");
//   if (store.state.token) {
//     store.state.auth = "true";
//   } else {
//     store.state.auth = "false";
//   }
//   if (to.meta.needsauth && store.state.auth === "false") {
//     next("/login");
//   } else {
//     next();
//   }
// });

export default router;
