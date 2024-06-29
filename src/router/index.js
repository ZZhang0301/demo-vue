/*
 * @Description:
 * @Version: 1.0
 * @Autor: Li Cheng
 * @Date: 2024-06-25 14:15:23
 * @LastEditors: Li Cheng
 * @LastEditTime: 2024-06-25 16:26:35
 */
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
