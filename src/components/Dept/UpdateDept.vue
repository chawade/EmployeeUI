<template>
    <div class="container">
        <h2>Update Department</h2>
        <div v-if="department" class="department-form">
            <div class="form-group">
                <label for="departmentName">Department Name:</label>
                <input type="text" id="departmentName" v-model="department.departmentName" class="form-control" />
            </div>
            <div class="form-group">
                <label for="managerID">Manager ID:</label>
                <input type="number" id="managerID" v-model="department.managerID" class="form-control" />
            </div>
            <div class="form-group">
                <button @click="goToDepartmentDetail(departmentId)" class="btn btn-danger">Cancel</button>
                <button @click="updateDepartment" class="btn btn-primary">Update</button>
            </div>
        </div>
        <div v-else>
            <p>Loading department data...</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { apiService } from '@/function/ApiService';

const department = ref(null);
const route = useRoute();
const departmentId = route.params.id;
const router = useRouter();


const fetchDepartment = async () => {
    try {
        if (departmentId) {
            const response = await apiService.getDepartmentById(departmentId);
            if (response && response.length > 0) {
                department.value = response[0];
            }
        }
    } catch (error) {
        console.error('Error fetching employee data:', error);
    }
};


const updateDepartment = async () => {
    try {
        if (department.value) {
            department.value.departmentID = departmentId;
            await apiService.updateDepartment(department.value);
            console.log('Department updated successfully');
            router.push(`/departments/${department.value.departmentID}`);
        }
    } catch (error) {
        console.error('Error updating department:', error);
    }
};

const goToDepartmentDetail = (departmentId) => {
    router.push(`/departments/${departmentId}`);
};

onMounted(() => {
    fetchDepartment();
});
</script>

<style scoped>
.department-form {
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
