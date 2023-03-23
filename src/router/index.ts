import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/home.vue";
import About from "../views/About/about.vue";
import Profile from "../views/Profile/profile.vue";
import { useUser } from "@/composables/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from) => {
  const { isUserAuthenticated } = useUser();

  if (to.meta.requiresAuth && !isUserAuthenticated()) {
    return {
      path: "/",
      name: "home",
    };
  }
});

export default router;
