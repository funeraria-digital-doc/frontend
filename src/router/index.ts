import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home/home.vue';
import Contacts from '../views/Contacts/contacts.vue';
import Profile from '../views/Profile/profile.vue';
import Users from '../views/Users/users.vue';
import Groups from '../views/Groups/groups.vue';
import Templates from '../views/Templates/templates.vue';
import Records from '../views/Records/records.vue';
import TemplatesForm from '../views/Templates/templatesForm.vue';
import RecordsForm from '../views/Records/recordsForm.vue';
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
      path: '/users',
      name: 'users',
      component: Users,
      meta: { requiresAuth: true },
    },
    {
      path: '/groups',
      name: 'groups',
      component: Groups,
      meta: { requiresAuth: true },
    },
    {
      path: '/templates',
      name: 'templates',
      component: Templates,
      meta: { requiresAuth: true },
    },
    {
      path: '/templates/create',
      name: 'templates_create',
      component: TemplatesForm,
      meta: { requiresAuth: true },
    },
    {
      path: '/templates/:id/edit',
      name: 'templates_edit',
      component: TemplatesForm,
      meta: { requiresAuth: true },
    },
    {
      path: '/records',
      name: 'records',
      component: Records,
      meta: { requiresAuth: true },
    },
    {
      path: '/records/create',
      name: 'records_create',
      component: RecordsForm,
      meta: { requiresAuth: true },
    },
    {
      path: '/records/:id/edit',
      name: 'records_edit',
      component: RecordsForm,
      meta: { requiresAuth: true },
    }
  ],
});

router.beforeEach((to) => {
  const { isUserAuthenticated, isAuthFromTokenLoaded } = useUser();

  if (
    to.meta.requiresAuth &&
    !isUserAuthenticated() &&
    isAuthFromTokenLoaded.value
  ) {
    return {
      path: '/',
      name: 'home',
    };
  }
});

export default router;
