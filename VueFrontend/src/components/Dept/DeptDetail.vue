<template>
  <div class="container">
    <div v-if="department" class="department-detail detail">
      <h2><span>Department Details</span></h2>
      <p>Department Name: {{ department.departmentName }}</p>
      <p>Manager ID: {{ department.managerID }}</p>
      <div v-if="department.projects && department.projects.length" class="projects">
        <h3>Projects:</h3>
        <ul>
          <li v-for="(project, index) in department.projects" :key="index">{{ index + 1 }}. {{ project }}</li>
        </ul>
      </div>
      <div class="detail-link">
        <router-link to="/departments" class="btn btn-primary">Back to Departments</router-link>
        <button @click="editDepartment" class="btn btn-primary">Edit</button>
        <button @click="deleteDepartment" class="btn btn-danger">Delete</button>
      </div>
    </div>
    <div v-else-if="isLoading">
      <div class="loading-message">
        <p>Loading...</p>
      </div>
    </div>
    <div v-else="!isLoading && fetchDepartment.length < 1">
      <div class="loading-message">
        <Notfound />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { apiService } from '@/function/ApiService.js';
import Notfound from '../Notfound.vue';


const department = ref(null);
const route = useRoute();
const router = useRouter();

const fetchDepartment = async () => {
  try {
    const departmentId = route.params.id;
    if (departmentId) {
      const response = await apiService.getDepartmentById(departmentId);
      if (response && response.length > 0) {
        department.value = response[0];
      }
    }
  } catch (error) {
    console.error('Error fetching department details:', error);
  }
};

const deleteDepartment = async () => {
  try {
    const confirmed = confirm('Are you sure you want to delete this department?');
    if (confirmed) {
      const departmentId = route.params.id;
      await apiService.deleteDepartment(departmentId);
      router.push('/departments');
    }
  } catch (error) {
    console.error('Error deleting department:', error);
  }
};

const editDepartment = () => {
  const departmentId = route.params.id;
  router.push(`/departments/${departmentId}/edit-dept`);
};

onMounted(() => {
  fetchDepartment();
});
</script>

<style scoped>
.department-detail {
  margin: 20px;
}
</style>