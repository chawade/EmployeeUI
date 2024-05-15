<!-- Employees.vue -->

<script setup>
import { ref } from 'vue';
import SearchBox from './SearchBox.vue';
import { apiService } from '../function/GetListEmp.js'; // เปลี่ยนการนำเข้าฟังก์ชัน searchEmployees เป็น apiService

const employees = ref([]);

const handleSearch = async (searchText) => {
  try {
    const result = await apiService.searchEmployees(searchText); // เรียกใช้งาน apiService.searchEmployees แทน searchEmployees
    if (result) {
      employees.value = result;
    } else {
      console.error('Failed to search employees.');
    }
  } catch (error) {
    console.error('Error while searching employees:', error);
  }
};
</script>

<template>
  <header>
    <div class="container emp-container">
      <SearchBox @search="handleSearch" />
      <div class="emp-table">
        <table class="data-table">
          <thead>
            <tr>
              <th></th>
              <th>Fname</th>
              <th>Lname</th>
              <th>Gender</th>
              <th>Dept</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(employee, index) in employees" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ employee.firstName }}</td>
              <td>{{ employee.lastName }}</td>
              <td>{{ employee.gender }}</td>
              <td>{{ employee.department }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </header>
</template>


<style scoped>
header {
  height: calc(100vh - 3rem);
  padding-top: 3rem;
}
</style>
