<template>
    <div class="container add-container">
        <div class="add-l">
            <li><router-link to="/employees" class="btn btn-primary">Back</router-link></li>
            <h1>Add New Employee</h1>
        </div>
        <form @submit.prevent="submitEmployee">
            <div class="form-group">
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" v-model="employee.firstName" required />
            </div>
            <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" v-model="employee.lastName" required />
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="employee.email" />
            </div>
            <div class="add-selection">
                <div class="form-group">
                    <label for="gender">Gender:</label>
                    <select id="gender" v-model="employee.gender">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="departmentID">Department:</label>
                    <select id="departmentID" v-model="selectedDepartment" class="dept-select">
                        <option v-for="dept in departments" :key="dept.departmentID" :value="dept.departmentID">
                            {{ dept.departmentName }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="jobTitle">Job Title:</label>
                <input type="text" id="jobTitle" v-model="employee.jobTitle" />
            </div>
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
const selectedDepartment = ref(1);
const departments = ref([]);

const employee = ref({
    firstName: '',
    lastName: '',
    email: '',
    gender: 'Other',
    departmentID: selectedDepartment,
    jobTitle: ''
});

const fetchDepartments = async () => {
    try {
        const response = await apiService.getDepartments();
        departments.value = response;
        if (response.length > 0) {
            selectedDepartment.value = response[0].departmentID; // Set the first department as the selected department
        }
    } catch (error) {
        console.error('Error fetching departments:', error);
    }
};

const submitEmployee = async () => {
    try {
        await apiService.addEmployee(employee.value);
        employee.value = {
            firstName: '',
            lastName: '',
            email: '',
            gender: 'Other',
            departmentID: selectedDepartment.value,
            jobTitle: ''
        };
        router.push(`/employees`);
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    fetchDepartments();
});
</script>
