<template>
  <div class="container">
    <h2>Employee Details</h2>
    <div v-if="employee" class="employee-detail">
      <h2>{{ employee.firstName }} {{ employee.lastName }}</h2>
      <p>Email: {{ employee.email }}</p>
      <p>Gender: {{ employee.gender }}</p>
      <p>Job Title: {{ employee.jobTitle }}</p>
      <p>Department: {{ employee.departmentName }}</p>
      <div v-if="employee.projects && employee.projects.length" class="projects">
        <h3>Projects:</h3>
        <ul>
          <li v-for="(project, index) in employee.projects" :key="index">{{ project }}</li>
        </ul>
      </div>
      <router-link to="/employees" class="btn btn-primary">Back to Employees</router-link>
    </div>
    <div v-else>
      <p>Loading employee details...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { apiService } from '../function/EmpApiService';

const employee = ref(null);
const route = useRoute();

const fetchEmployee = async () => {
  try {
    const employeeId = route.params.id;
    if (employeeId) {
      const response = await apiService.getEmployeeById(employeeId);
      if (response && response.length > 0) {
        employee.value = response[0];
      }
      console.log(employee.value);
    }
  } catch (error) {
    console.error('Error fetching employee details:', error);
  }
};

onMounted(() => {
  fetchEmployee();
});
</script>

<style scoped>
.employee-detail p {
  margin: 5px 0;
}

.projects {
  margin-top: 20px;
}

.projects h3 {
  margin-bottom: 10px;
}

.projects ul {
  list-style-type: disc;
  padding-left: 20px;
}

.projects li {
  margin: 5px 0;
}
</style>
