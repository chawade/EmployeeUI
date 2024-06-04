<template>
    <div class="container emp-container">
      <div class="emp-header">
        <div class="emp-selectDept">
          <label for="departmentID">Department : </label>
          <select id="departmentID" v-model="selectedDepartment" class="dept-select">
            <option disabled selected value="" style="display: none;">Select Department</option>
            <option v-for="dept in departments" :key="dept.departmentID" :value="dept.departmentName">
              {{ dept.departmentName }}
            </option>
          </select>
          <button @click="clearSelection" class="btn btn-danger">Clear</button>
        </div>
        <div class="emp-addSearch">
          <SearchBox @search="handleSearch" v-model:search="searchQuery" />
          <li><router-link to="/projects/add-project" class="btn btn-primary">New</router-link></li>
        </div>
      </div>
      <div class="emp-table" v-if="filteredProjects.length > 0">
        <table class="data-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Project Name</th>
              <th>Department</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(project, index) in filteredProjects" :key="project.projectID" @click="goToProjectDetail(project.projectID)">
              <td>{{ index + 1 }}</td>
              <td>{{ project.projectName }}</td>
              <td>{{ project.department }}</td>
              <td>{{ formatDate(project.startDate) || '-' }}</td>
              <td>{{ formatDate(project.endDate) || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="emp-notfound" v-else>
        <p>No projects found.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import SearchBox from '../SearchBox.vue';
  import { apiService } from '@/function/ApiService.js';
  
  const projects = ref([]);
  const departments = ref([]);
  const searchQuery = ref('');
  const selectedDepartment = ref('');
  const isLoading = ref(true);
  const router = useRouter();
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
};

  const fetchProjects = async () => {
    try {
      projects.value = await apiService.getProjects();
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      isLoading.value = false;
    }
  };
  
  const fetchDepartments = async () => {
    try {
      departments.value = await apiService.getDepartments();
    } catch (error) {
      console.error('Error fetching departments:', error);
      alert('Error fetching departments: ' + error.message);
    }
  };
  
  const filteredProjects = computed(() => {
    const query = searchQuery.value.toLowerCase();
    const selectedDept = selectedDepartment.value.toLowerCase();
  
    if (selectedDept === '') {
      return projects.value.filter(project => {
        const projectName = project.projectName?.toLowerCase();
        return (query === '' || projectName?.includes(query));
      });
    } else {
      return projects.value.filter(project => {
        const department = project.department?.toLowerCase();
        const projectName = project.projectName?.toLowerCase();
        return department === selectedDept &&
          (query === '' || projectName?.includes(query));
      });
    }
  });
  
  const clearSearchBox = () => {
    searchQuery.value = '';
  };
  
  const handleSearch = (query) => {
    searchQuery.value = query;
  };
  
  const clearSelection = () => {
    selectedDepartment.value = '';
    searchQuery.value = '';
    clearSearchBox();
  };
  
  const goToProjectDetail = (projectID) => {
    router.push(`/projects/${projectID}`);
  };
  
  onMounted(async () => {
    await fetchProjects();
    await fetchDepartments();
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
  