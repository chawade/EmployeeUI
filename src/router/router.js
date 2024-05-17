import { createRouter, createWebHistory } from 'vue-router'; // ใช้การนำเข้า createRouter และ createWebHistory แทน Router

import Employees from '@/components/Employees.vue';
import Home from '@/components/Home.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/employees',
            name: 'Employees',
            component: Employees
        }
    ]
});

export default router;