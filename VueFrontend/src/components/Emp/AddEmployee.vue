<template>
    <div class="container add-container">
        <div class="add-l">
            <li><router-link to="/employees" class="btn btn-primary">Back</router-link></li>
            <h1>Add New Employees</h1>
        </div>
        <form @submit.prevent="submitEmployees">
            <table class="employee-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Department</th>
                        <th>Job Title</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(employee, index) in employees" :key="index">
                        <td>
                            <input type="text" v-model="employee.firstName" required />
                        </td>
                        <td>
                            <input type="text" v-model="employee.lastName" required />
                        </td>
                        <td>
                            <input type="email" v-model="employee.email" />
                        </td>
                        <td>
                            <select v-model="employee.gender">
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </td>
                        <td>
                            <select v-model="employee.departmentID">
                                <option v-for="dept in departments" :key="dept.departmentID" :value="dept.departmentID">
                                    {{ dept.departmentName }}
                                </option>
                            </select>
                        </td>
                        <td>
                            <input type="text" v-model="employee.jobTitle" />
                        </td>
                        <td>
                            <button type="button" @click="removeEmployee(index)" class="btn btn-secondary">Remove</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="button" @click="addEmployee" class="btn btn-success">Add Another Employee</button>
            <div class="add-submit">
                <button type="submit" class="btn btn-danger">Submit</button>
            </div>
        </form>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { apiService } from '@/function/ApiService';

const router = useRouter();
const departments = ref([]);

const employees = ref([
    {
        firstName: '',
        lastName: '',
        email: '',
        gender: 'Other',
        departmentID: '',
        jobTitle: ''
    }
]);

const fetchDepartments = async () => {
    try {
        const response = await apiService.getDepartments();
        departments.value = response;
        if (response.length > 0) {
            employees.value.forEach(employee => {
                employee.departmentID = response[0].departmentID; // Set the first department as the default for all employees
            });
        }
    } catch (error) {
        console.error('Error fetching departments:', error);
    }
};

const addEmployee = () => {
    employees.value.push({
        firstName: '',
        lastName: '',
        email: '',
        gender: 'Other',
        departmentID: departments.value.length > 0 ? departments.value[0].departmentID : '',
        jobTitle: ''
    });
};

const removeEmployee = (index) => {
    if (employees.value.length > 1) {
        employees.value.splice(index, 1);
    }
};

const submitEmployees = async () => {
    try {
        await Promise.all(employees.value.map(employee => apiService.addEmployee(employee)));
        employees.value = [
            {
                firstName: '',
                lastName: '',
                email: '',
                gender: 'Other',
                departmentID: departments.value.length > 0 ? departments.value[0].departmentID : '',
                jobTitle: ''
            }
        ];
        router.push(`/employees`);
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    fetchDepartments();
});
</script>
<style scoped>
.container {
    margin: 0 auto;
    max-width: 1200px;
}

.add-container {
    padding: 20px;
}

.employee-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.employee-table th,
.employee-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

.employee-table th {
    background-color: #6c757d;
}

.employee-table input,
.employee-table select {
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
}

.add-submit {
    text-align: center;
    margin-top: 20px;
}

.btn {
    padding: 10px 20px;
    margin: 5px;
}

.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-success {
    background-color: #28a745;
    color: white;
}

.btn-danger {
    background-color: #dc3545;
    color: white;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}
</style>
