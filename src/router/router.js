import { createRouter, createWebHistory } from 'vue-router'; // ใช้การนำเข้า createRouter และ createWebHistory แทน Router

import Employees from '@/components/Employees.vue';

// สร้าง Router
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'employees',
            component: Employees
        }
    ]
});

export default router; // ส่งออก router ที่สร้างขึ้น
