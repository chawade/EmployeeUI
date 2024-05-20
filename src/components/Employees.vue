<!-- Employees.vue -->

<script setup>
import { ref, onMounted } from 'vue';
import SearchBox from './SearchBox.vue';
import { apiService } from '../function/GetListEmp.js';

const employees = ref([]);

const handleSearch = async (searchText) => {
  try {
    const result = await apiService.searchEmployees(searchText);
    employees.value = result;
  } catch (error) {
    console.error('Error while searching employees:', error);
  }
};

const fetchEmployees = async () => {
  try {
    employees.value = await apiService.getEmployees();
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
};

onMounted(fetchEmployees);

</script>


<template>
  <div class="container emp-container">
    <SearchBox @search="handleSearch" />
    <div class="emp-table" v-if="employees.length > 0">
      <table class="data-table">
        <thead>
          <tr>
            <th>No.</th>
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

    <div class="emp-notfound" v-else>
      <p>No employees found.</p>
    </div>
  </div>
</template>

<style scoped></style>
