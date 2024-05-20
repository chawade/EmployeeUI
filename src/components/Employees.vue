<!-- Employees.vue -->

<script setup>
import { ref, onMounted } from 'vue';
import SearchBox from './SearchBox.vue';
import { apiService } from '../function/ApiService';

const employees = ref([]);

// Search
const handleSearch = async (searchText) => {
  try {
    const result = await apiService.searchEmployees(searchText);
    employees.value = result;
  } catch (error) {
    console.error('Error while searching employees:', error);
  }
};


//Get All Emp List
const fetchEmployees = async () => {
  try {
    employees.value = await apiService.getEmployees();
  } catch (error) {
    console.error('Error fetching employees:', error);
  } finally {
    isLoading.value = false;
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

    <div class="emp-notfound" v-else-if="!isLoading">
      <p>No employees found.</p>
    </div>
  </div>
</template>

<style scoped></style>
