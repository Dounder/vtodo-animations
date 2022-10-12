import useAuth from 'src/composables/useAuth';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: (to, from, next) =>
      useAuth().isAuthenticated ? next() : next({ name: 'login' }),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
  },

  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    beforeEnter: (to, from, next) =>
      useAuth().isAuthenticated ? next({ name: 'home' }) : next(),
    children: [
      {
        path: '',
        component: () => import('pages/AuthPage.vue'),
        name: 'login',
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
