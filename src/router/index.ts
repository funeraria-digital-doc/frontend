import { createRouter, createWebHistory } from 'vue-router';
import { checkAuth, getAuth } from '@/authorizations/authorizations';

const Home = () => import('@/views/Home/home.vue');
const Profile = () => import('@/views/Profile/profile.vue');
const Users = () => import('@/views/Users/users.vue');
const Groups = () => import('@/views/Groups/groups.vue');
const Funeraria = () => import('@/views/Funeraria/funeraria.vue');
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
      meta: { roles: getAuth('home') },
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { roles: getAuth('profile') },
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: { roles: getAuth('users') },
    },
    {
      path: '/groups',
      name: 'groups',
      component: Groups,
      meta: { roles: getAuth('groups') },
    },
    {
      path: '/templates',
      name: 'templates',
      component: Templates,
      meta: { roles: getAuth('templates') },
    },
    {
      path: '/templates/create',
      name: 'templates_create',
      component: TemplatesForm,
      meta: { roles: getAuth('templates_create') },
    },
    {
      path: '/templates/:id/edit',
      name: 'templates_edit',
      component: TemplatesForm,
      meta: { roles: getAuth('templates_edit') },
    },
    {
      path: '/records',
      name: 'records',
      component: Records,
      meta: { roles: getAuth('records') },
    },
    {
      path: '/records/create',
      name: 'records_create',
      component: RecordsForm,
      meta: { roles: getAuth('records_create') },
    },
    {
      path: '/records/:id/edit',
      name: 'records_edit',
      component: RecordsForm,
      meta: { roles: getAuth('records_edit') },
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats,
      meta: { roles: getAuth('stats') },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { roles: getAuth('about') },
    },
    {
      path: '/not-found',
      component: ErrorPage,
      name: 'not_found',
      meta: { roles: getAuth('not_found'), status: 'not-found' },
    },
    {
      path: '/service-unavailable',
      component: ErrorPage,
      name: 'service_unavailable',
      meta: {
        roles: getAuth('service_unavailable'),
        status: 'service-unavailable',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'not_found' },
      name: 'others',
      meta: { roles: getAuth('others') },
    },
    {
      path: '/funeraria/:id',
      name: 'funeraria',
      component: Funeraria,
      meta: { roles: getAuth('funeraria') },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (await checkAuth(to.meta.roles)) {
    next();
  } else {
    next({ name: 'home' });
  }
});

export default router;
