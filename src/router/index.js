import { createWebHistory, createRouter } from 'vue-router';

import Base from '@/views/base.vue';
import List from '@/views/list.vue';


const routes = [
  { path: '/', redirect: '/base' },
  { path: '/base', component: Base },
  { path: '/list', component: List },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
