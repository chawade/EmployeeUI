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


// Select Department 
const selectedDepartment = ref(0);

const handleDepartmentChange = async () => {
    try {
        const departmentId = selectedDepartment.value;
        const employeesInDepartment = await apiService.selectDepartment(departmentId);
        employees.value = employeesInDepartment;
    } catch (error) {
        console.error('Error selecting department:', error);
    }
};
// Clear Selection function
const clearSelection = async () => {
  selectedDepartment.value = 0;
  await fetchEmployees();
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
    <div class="emp-header">
      <div class="emp-selectDept">
        <label for="departmentID">Department : </label>
        <select id="departmentID" v-model="selectedDepartment" @change="handleDepartmentChange">
          <option value="0">Select Department</option>
          <option value="1">IT</option>
          <option value="2">HR</option>
          <option value="3">Marketing</option>
          <option value="4">Logistic</option>
        </select>
        <button @click="clearSelection">Clear Selection</button>
      </div>
      <SearchBox @search="handleSearch" />
      <li><router-link to="/add-employee">New</router-link></li>

    </div>
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
