import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home/home.vue';
import Contacts from '../views/Contacts/contacts.vue';
import Profile from '../views/Profile/profile.vue';
import DeathDeclaration from '../views/DeathDeclaration/deathDeclaration.vue';
import { useUser } from '@/composables/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true },
    },
    {
      path: '/death-declaration',
      name: 'death_declaration',
      component: DeathDeclaration,
    },
  ],
});

router.beforeEach((to) => {
  const { isUserAuthenticated } = useUser();

  if (to.meta.requiresAuth && !isUserAuthenticated()) {
    return {
      path: '/',
      name: 'home',
    };
  }
});

export default router;
