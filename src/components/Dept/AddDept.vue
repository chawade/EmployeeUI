<template>
    <div class="container add-container">
        <div class="add-l">
            <li><router-link to="/departments" class="btn btn-primary">Back</router-link></li>
            <h1>Add New Department</h1>
        </div>
        <form @submit.prevent="submitDepartment">
            <div class="form-group">
                <label for="departmentName">Department Name:</label>
                <input type="text" id="departmentName" v-model="department.departmentName" required />
            </div>
            <div class="form-group">
                <label for="managerID">Manager ID:</label>
                <input type="number" id="managerID" v-model="department.managerID" required />
            </div>
            <div class="add-submit">
                <button type="submit" class="btn btn-danger">Submit</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiService } from '@/function/ApiService';

const router = useRouter();

const department = ref({
    departmentName: '',
    managerID: '',
    projects: []
});

const submitDepartment = async () => {
    try {
        await apiService.addDepartment(department.value);
        department.value = {
            departmentName: '',
            managerID: '',
        };
        router.push(`/departments`);
    } catch (error) {
        console.error(error);
    }
};

</script>
