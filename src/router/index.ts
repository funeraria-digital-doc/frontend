import { createRouter, createWebHistory } from 'vue-router';
import { checkAuth } from '@/utils/authorizations';
import { NO_AUTH, STAFF, SUPER, USER } from '@/utils/constants';

//import { defineAsyncComponent } from 'vue';
// const Home = defineAsyncComponent(() => import('@/views/Home/home.vue'));
// const Contacts = () => import('@/views/Contacts/contacts.vue')
// const Profile = defineAsyncComponent(
//   () => import('@/views/Profile/profile.vue')
// );
// const Users = defineAsyncComponent(() => import('@/views/Users/users.vue'));
// const Groups = defineAsyncComponent(() => import('@/views/Groups/groups.vue'));
// const Templates = defineAsyncComponent(
//   () => import('@/views/Templates/templates.vue')
// );
// const Records = defineAsyncComponent(
//   () => import('@/views/Records/records.vue')
// );
// const TemplatesForm = defineAsyncComponent(
//   () => import('@/views/Templates/templatesForm.vue')
// );
// const RecordsForm = defineAsyncComponent(
//   () => import('@/views/Records/recordsForm.vue')
// );
const Home = () => import('@/views/Home/home.vue');
const Profile = () => import('@/views/Profile/profile.vue');
const Users = () => import('@/views/Users/users.vue');
const Groups = () => import('@/views/Groups/groups.vue');
const Templates = () => import('@/views/Templates/templates.vue');
const Records = () => import('@/views/Records/records.vue');
const TemplatesForm = () => import('@/views/Templates/templatesForm.vue');
const RecordsForm = () => import('@/views/Records/recordsForm.vue');
const Stats = () => import('@/views/Stats/stats.vue');
const ErrorPage = () => import('@/views/Error/errorPage.vue');
const About = () => import('@/views/About/about.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: false, minRole: NO_AUTH },
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true, minRole: USER },
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: { requiresAuth: true, minRole: STAFF },
    },
    {
      path: '/groups',
      name: 'groups',
      component: Groups,
      meta: { requiresAuth: true, minRole: SUPER },
    },
    {
      path: '/templates',
      name: 'templates',
      component: Templates,
      meta: { requiresAuth: true, minRole: SUPER },
    },
    {
      path: '/templates/create',
      name: 'templates_create',
      component: TemplatesForm,
      meta: { requiresAuth: true, minRole: SUPER },
    },
    {
      path: '/templates/:id/edit',
      name: 'templates_edit',
      component: TemplatesForm,
      meta: { requiresAuth: true, minRole: SUPER },
    },
    {
      path: '/records',
      name: 'records',
      component: Records,
      meta: { requiresAuth: true, minRole: USER },
    },
    {
      path: '/records/create',
      name: 'records_create',
      component: RecordsForm,
      meta: { requiresAuth: true, minRole: USER },
    },
    {
      path: '/records/:id/edit',
      name: 'records_edit',
      component: RecordsForm,
      meta: { requiresAuth: true, minRole: USER },
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats,
      meta: { requiresAuth: true, minRole: STAFF },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { requiresAuth: false, minRole: NO_AUTH },
    },
    {
      path: '/not-found',
      component: ErrorPage,
      name: 'not_found',
      meta: { requiresAuth: false, minRole: NO_AUTH, status: 'not-found' },
    },
    {
      path: '/service-unavailable',
      component: ErrorPage,
      name: 'service_unavailable',
      meta: {
        requiresAuth: false,
        minRole: NO_AUTH,
        status: 'service-unavailable',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'not_found' },
      meta: { requiresAuth: false, minRole: NO_AUTH },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (!(await checkAuth(to.meta.minRole, to.meta.requiresAuth))) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
