<!-- src/components/Employees.vue -->
<template>
  <div class="container emp-container">
    <div class="emp-header">
      <div class="emp-addSearch">
        <SearchBox @search="handleSearch" v-model:search="searchQuery" />
        <li><router-link to="/departments/add-department" class="btn btn-primary">New</router-link></li>
      </div>
    </div>
    <div class="emp-table">
      <table class="data-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Department</th>
            <th>ManagerID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(department, index) in filteredDepartments" :key="index" @click="goToDepartmentDetail(department.departmentID)">
            <td>{{ index + 1 }}</td>
            <td>{{ department.departmentName }}</td>
            <td>{{ department.managerID }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="emp-notfound" v-if="!isLoading && filteredDepartments.length === 0">
      <p>No departments found.</p>
    </div>
  </div>
</template>

  
  <script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import SearchBox from '../SearchBox.vue';
import { apiService } from '@/function/ApiService.js';

const departments = ref([]);
const searchQuery = ref('');
const isLoading = ref(true);
const router = useRouter();

const fetchDepartments = async () => {
  try {
    departments.value = await apiService.getDepartments();
  } catch (error) {
    console.error('Error fetching departments:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleSearch = (query) => {
  searchQuery.value = query;
};

const goToDepartmentDetail = (departmentID) => {
  router.push(`/departments/${departmentID}`);
};

onMounted(async () => {
  await fetchDepartments();
});

// Filter departments based on search query
const filteredDepartments = computed(() => {
  return departments.value.filter(department =>
    department.departmentName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

  
  <style scoped>
  .btn-danger {
    font-size: 14px;
    border-radius: 5px;
    padding: 10px;
  }
  
  tbody tr:hover {
    color: var(--color-black);
    background-color: var(--color-light);
    cursor: pointer;
  }
  </style>
  