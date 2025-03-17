import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/AddProjects",
      name: "AddProjects",
      component: () => import("../views/AddProjects.vue"),
    },
    {
      path: "/ViewProjects",
      name: "ViewProjects",
      component: () => import("../views/ViewProjects.vue"),
    },
  ],
});

export default router;
