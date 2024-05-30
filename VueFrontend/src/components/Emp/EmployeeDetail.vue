<!-- EmployeeDetail.vue -->
<template>
  <div class="container">
    <div v-if="isLoading" class="loading-message">
      <Loading/>
    </div>
    <div v-else-if="employee" class="employee-detail detail">
      <h2><span>Employee Details</span></h2>
      <h2>{{ employee.firstName }} {{ employee.lastName }}</h2>
      <p>Email: {{ employee.email || '-' }}</p>
      <p>Gender: {{ employee.gender || '-' }}</p>
      <p>Job Title: {{ employee.jobTitle || '-' }}</p>
      <p>Department: {{ employee.departmentName || '-' }}</p>
      <h3>Projects:</h3>
      <div v-if="employee.projects && employee.projects.length" class="projects">
        <ul>
          <li v-for="(project, index) in employee.projects" :key="index">{{ index + 1 }}. {{ project || '-' }}</li>
        </ul>
      </div>
      <div v-else>
        <p>Currently not responsible for any projects.</p>
      </div>
      <div class="detail-link">
        <router-link to="/employees" class="btn btn-primary">Back to Employees</router-link>
        <button @click="editEmployee" class="btn btn-primary">Edit</button>
        <button @click="deleteEmployee" class="btn btn-danger">Delete</button>
      </div>
    </div>
    <div class="notfound" v-else>
      <Notfound/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { apiService } from '@/function/ApiService.js';
import Notfound from '../Notfound.vue';
import Loading from '../Loading.vue';

const employee = ref(null);
const route = useRoute();
const router = useRouter();
const isLoading = ref(false);

const fetchEmployee = async () => {
  try {
    isLoading.value = true;
    const employeeId = route.params.id;
    if (employeeId) {
      const response = await apiService.getEmployeeById(employeeId);
      if (response && response.length > 0) {
        employee.value = response[0];
      }
    }
  } catch (error) {
    console.error('Error fetching employee details:', error);
  } finally {
    isLoading.value = false;
  }
};

const deleteEmployee = async () => {
  try {
    const confirmed = confirm('Are you sure you want to delete this employee?');
    if (confirmed) {
      const employeeId = route.params.id;
      await apiService.deleteEmployee(employeeId);
      router.push('/employees');
    }
  } catch (error) {
    console.error('Error deleting employee:', error);
  }
};

const editEmployee = () => {
  const employeeId = route.params.id;
  router.push(`/employees/${employeeId}/edit-emp`);
};

onMounted(() => {
  fetchEmployee();
});
</script>

<style scoped>
.employee-detail {
  margin: 20px;
}
</style>
