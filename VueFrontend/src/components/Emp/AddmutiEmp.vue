<template>
    <div class="container addemp-container">
        <div v-if="isLoading" class="loading-message">
            <Loading />
        </div>
        <div v-else-if="!isLoading">
            <div class="add-t">
                <router-link to="/employees" class="btn btn-primary">Back</router-link>
                <h2><span>Add New Employees</span></h2>
            </div>
            <div class="add-b">
                <form @submit.prevent="submitEmployees">
                    <table class="add-table">
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
                                <td><input type="text" v-model="employee.firstName" required /></td>
                                <td><input type="text" v-model="employee.lastName" required /></td>
                                <td><input type="email" v-model="employee.email" /></td>
                                <td class="addemp-selection">
                                    <select v-model="employee.gender">
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </td>
                                <td class="addemp-selection">
                                    <select v-model="employee.departmentID">
                                        <option v-for="dept in departments" :key="dept.departmentID"
                                            :value="dept.departmentID">
                                            {{ dept.departmentName }}
                                        </option>
                                    </select>
                                </td>
                                <td><input type="text" v-model="employee.jobTitle" /></td>
                                <td><button type="button" @click="removeRow(index)"
                                        class="btn btn-danger">Remove</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="form-group">
                        <button type="button" @click="addRow" class="btn btn-primary">Add Row</button>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-danger">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="notfound" v-else>
            <Notfound />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { apiService } from '@/function/ApiService';
import Loading from '../Loading.vue';
import Notfound from '../Notfound.vue';

const router = useRouter();
const departments = ref([]);
const employees = ref([]);

const isLoading = ref(false);

const fetchDepartments = async () => {
    try {
        isLoading.value = true;
        const response = await apiService.getDepartments();
        departments.value = response;

        if (departments.value.length > 0) {
            employees.value = [
                {
                    firstName: '',
                    lastName: '',
                    email: '',
                    gender: 'Other',
                    departmentID: departments.value[0].departmentID,
                    jobTitle: ''
                }
            ];
        }
    } catch (error) {
        console.error('Error fetching departments:', error);
    } finally {
        isLoading.value = false;
    }
};

const addRow = async () => {
    try {
        const response = await apiService.getDepartments();
        departments.value = response;

        if (departments.value.length > 0) {
            employees.value.push({
                firstName: '',
                lastName: '',
                email: '',
                gender: 'Other',
                departmentID: departments.value[0].departmentID,
                jobTitle: ''
            });
        }
    } catch (error) {
        console.error('Error fetching departments:', error);
    }
};


const removeRow = (index) => {
    if (employees.value.length > 1) {
        employees.value.splice(index, 1);
    }
};

const submitEmployees = async () => {
    try {
        for (const employee of employees.value) {
            await apiService.addEmployee(employee);
        }
        employees.value = [
            {
                firstName: '',
                lastName: '',
                email: '',
                gender: 'Other',
                departmentID: null,
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
.addemp-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    margin-top: 3rem;
    /* เว้นระยะ 3rem จากด้านบน */
}

.add-t {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.add-b {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0;
}

.add-table {
    width: 100%;
    /* max-width: 800px; */
    margin-bottom: 2rem;
    border-collapse: collapse;
}

.add-table th,
.add-table td {
    padding: 8px;
    text-align: left;
}

.add-table th {
    /* background-color: #f2f2f2; */
}

.form-group {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

.addemp-selection select {
    display: flex;
    width: 100%;
    padding: 10px;
    border: 1px solid var(--color-white);
    border-radius: 10px;
    font-size: 16px;
}
</style>