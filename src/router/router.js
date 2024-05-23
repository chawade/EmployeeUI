import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/components/Home.vue'
import Employees from '@/components/Employees.vue';
import AddEmployee from '@/components/AddEmployee.vue';
import EmployeeDetail from '@/components/EmployeeDetail.vue';

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
        },
        {
            path: '/employees/add-employee',
            name: 'AddEmployee',
            component: AddEmployee
        },
        {
            path: '/employees/:id',
            name: 'Detail',
            component: EmployeeDetail,
            props: true,
        }
    ]
});

export default router;