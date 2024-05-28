import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/components/Home.vue'
import Employees from '@/components/Emp/Employees.vue';
import AddEmployee from '@/components/Emp/AddEmployee.vue';
import EmployeeDetail from '@/components/Emp/EmployeeDetail.vue';
import UpdateEmployee from '@/components/Emp/UpdateEmployee.vue';

import Departments from '@/components/Dept/Departments.vue';
import DeptDetail from '@/components/Dept/DeptDetail.vue';
import AddDept from '@/components/Dept/AddDept.vue';
import UpdateDept from '@/components/Dept/UpdateDept.vue';

import Projects from '@/components/Project/Projects.vue';
import ProjectDetail from '@/components/Project/ProjectDetail.vue';
import AddProject from '@/components/Project/AddProject.vue';
import UpdateProject from '@/components/Project/UpdateProject.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // Employee
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
        },
        {
            path: '/employees/:id/edit-emp',
            name: 'Edit',
            component: UpdateEmployee,
        },

        // Department
        {
            path: '/departments',
            name: 'Department',
            component: Departments
        },
        {
            path: '/departments/add-department',
            name: 'AddDept',
            component: AddDept
        },
        {
            path: '/departments/:id',
            name: 'DeptDetail',
            component: DeptDetail,
            props: true,
        },
        {
            path: '/departments/:id/edit-dept',
            name: 'UpdateDept',
            component: UpdateDept,
        },

        // Project
        {
            path: '/projects',
            name: 'Projects',
            component: Projects
        },
        {
            path: '/projects/add-project',
            name: 'AddProject',
            component: AddProject
        },
        {
            path: '/projects/:id',
            name: 'ProjectDetail',
            component: ProjectDetail,
            props: true,
        },
        {
            path: '/projects/:id/edit-project',
            name: 'UpdateProject',
            component: UpdateProject,
        }
    ]
});

export default router;