import { createRouter, createWebHistory } from 'vue-router'

import AdminHome from '../views/admin/AdminHome.vue'
import ConfigEditor from '../views/admin/ConfigEditor.vue'
import H5Render from '../views/h5/H5Render.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/admin' },
    { path: '/admin', component: AdminHome },
    { path: '/admin/edit/:id', component: ConfigEditor, props: true },
    { path: '/admin/new', component: ConfigEditor },
    { path: '/h5/:id', component: H5Render, props: true },
  ],
})

