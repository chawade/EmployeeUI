<template>
    <div class="container">
        <h2>Update Employee</h2>
        <div v-if="employee" class="employee-form">
            <div class="form-group">
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" v-model="employee.firstName" class="form-control" />
            </div>
            <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" v-model="employee.lastName" class="form-control" />
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="employee.email" class="form-control" />
            </div>
            <div class="form-group">
                <label for="gender">Gender:</label>
                <select id="gender" v-model="employee.gender" class="form-control">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label for="jobTitle">Job Title:</label>
                <input type="text" id="jobTitle" v-model="employee.jobTitle" class="form-control" />
            </div>
            <div class="form-group">
                <label for="departmentID">Department:</label>
                <select id="departmentID" v-model="employee.departmentID" class="form-control" required>
                    <option value="1">IT</option>
                    <option value="2">HR</option>
                    <option value="3">Marketing</option>
                    <option value="4">Logistic</option>
                </select>
            </div>
            <button @click="updateEmployee" class="btn btn-primary">Update</button>
        </div>
        <div v-else>
            <p>Loading employee data...</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { apiService } from '@/function/ApiService';

const employee = ref(null);
const route = useRoute();
const employeeId = route.params.id;
const router = useRouter();

const fetchEmployee = async () => {
    try {
        if (employeeId) {
            const response = await apiService.getEmployeeById(employeeId);
            if (response && response.length > 0) {
                employee.value = response[0];
            }
        }
    } catch (error) {
        console.error('Error fetching employee data:', error);
    }
};


const updateEmployee = async () => {
    try {
        if (employee.value) {
            employee.value.employeeId = route.params.id;
            await apiService.updateEmployee(employee.value);
            console.log('Employee updated successfully');
            router.push(`/employees/${employee.value.employeeId}`);
        }
    } catch (error) {
        console.error('Error updating employee:', error);
    }
};

onMounted(() => {
    fetchEmployee();
});
</script>

<style scoped>
.employee-form {
    margin: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-control {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
</style>
