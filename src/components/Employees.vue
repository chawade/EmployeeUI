<!-- Employees.vue -->

<script setup>
import { ref, onMounted } from 'vue';
// import SearchBox from './SearchBox.vue';
// import { apiService } from '../function/GetListEmp.js';

const employees = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:5173/api/Employee/GetEmployees'); 
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    employees.value = data;
  } catch (error) {
    alert(error.message);
  }
});
</script>


<template>
  <div class="container emp-container">
    <!-- <SearchBox @search="handleSearch" /> -->
    <div class="emp-table">
      <table class="data-table">
        <thead>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Job Title</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(employee, index) in employees" :key="employee.EmployeeID">
            <td>{{ index + 1 }}</td>
            <td>{{ employee.firstName }}</td>
            <td>{{ employee.lastName }}</td>
            <td>{{ employee.email || 'N/A' }}</td>
            <td>{{ employee.gender || 'N/A' }}</td>
            <td>{{ employee.departmentName }}</td>
            <td>{{ employee.jobTitle || 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
