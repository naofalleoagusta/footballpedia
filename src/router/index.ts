import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@components/home/views/HomeView.vue"),
    },
    {
      path: "/area/:id",
      name: "area detail",
      component: () => import("@components/area/views/AreaView.vue"),
    },
    {
      path: "/team/:id",
      name: "team detail",
      component: () => import("@components/team/views/TeamView.vue"),
    },
    {
      path: "/player/:id",
      name: "player detail",
      component: () => import("@components/player/views/PlayerView.vue"),
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;
