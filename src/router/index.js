import { createWebHistory, createRouter } from 'vue-router';

import Base from '@/views/base.vue';
import List from '@/views/list.vue';
import Web3D from '@/components/web3d.vue'
import Library from '@/components/library.vue';

const routes = [
  { path: '/', redirect: '/base' },
  { path: '/base', component: Base },
  { path: '/list', component: List },
  { path: '/web3d', component: Web3D },
  { path: '/library', component: Library },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
