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
                <select id="departmentID" v-model="selectedDepartment" class="dept-select">
                    <option v-for="dept in departments" :key="dept.departmentID" :value="dept.departmentID">
                        {{ dept.departmentName }}
                    </option>
                </select>
            </div>
            <div class="update-link">
                <button @click="goToEmployeeDetail(employeeId)" class="btn btn-danger">Cancel</button>
                <button @click="updateEmployee" class="btn btn-primary">Update</button>
            </div>
        </div>
        <div v-else>
            <Loading/>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { apiService } from '@/function/ApiService';
import Loading from '../Loading.vue';

const employee = ref(null);
const departments = ref([]);
const selectedDepartment = ref('');
const route = useRoute();
const employeeId = route.params.id;
const router = useRouter();

const fetchEmployee = async () => {
    try {
        if (employeeId) {
            const response = await apiService.getEmployeeById(employeeId);
            if (response && response.length > 0) {
                employee.value = response[0];
                selectedDepartment.value = response[0].departmentID;
                console.log(selectedDepartment.value);

            }
        }
    } catch (error) {
        console.error('Error fetching employee data:', error);
    }
};

const fetchDepartments = async () => {
    try {
        const response = await apiService.getDepartments();
        departments.value = response;
    } catch (error) {
        console.error('Error fetching departments:', error);
    }
};

const updateEmployee = async () => {
    try {
        if (employee.value) {
            employee.value.employeeId = employeeId;
            employee.value.departmentID = selectedDepartment.value; // Update the department ID
            await apiService.updateEmployee(employee.value);
            console.log('Employee updated successfully');
            router.push(`/employees/${employee.value.employeeId}`);
        }
    } catch (error) {
        console.error('Error updating employee:', error);
    }
};

const goToEmployeeDetail = (employeeId) => {
    router.push(`/employees/${employeeId}`);
};

onMounted(() => {
    fetchEmployee();
    fetchDepartments();
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
