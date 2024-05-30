<!-- src/components/Employees.vue -->
<template>
  <div class="container emp-container">
    <div v-if="isLoading" class="loading-message">
      <Loading />
    </div>
    <div v-else-if="!isLoading">
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
          <!-- <router-link to="/employees/add-employee" class="btn btn-primary">New</router-link> -->
          <router-link to="/employees/add-employee/more" class="btn btn-primary">New</router-link>
        </div>
      </div>
      <div class="emp-table" v-if="filteredEmployees.length > 0">
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
            <tr v-for="(employee, index) in filteredEmployees" :key="employee.employeeID"
              @click="goToEmployeeDetail(employee.employeeID)">
              <td>{{ index + 1 }}</td>
              <td>{{ employee.firstName }}</td>
              <td>{{ employee.lastName }}</td>
              <td>{{ employee.email || '-' }}</td>
              <td>{{ employee.gender || '-' }}</td>
              <td>{{ employee.departmentName }}</td>
              <td>{{ employee.jobTitle || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="notfound" v-else>
      <Notfound />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import SearchBox from '../SearchBox.vue';
import { apiService } from '@/function/ApiService.js';
import Loading from '../Loading.vue';
import Notfound from '../Notfound.vue';

const employees = ref([]);
const departments = ref([]);
const searchQuery = ref('');
const selectedDepartment = ref('');
const router = useRouter();

const isLoading = ref(false);

const fetchEmployees = async () => {
  try {
    isLoading.value = true;
    employees.value = await apiService.getEmployees();
  } catch (error) {
    console.error('Error fetching employees:', error);
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

const filteredEmployees = computed(() => {
  const query = searchQuery.value.toLowerCase();
  const selectedDept = selectedDepartment.value.toLowerCase();

  if (selectedDept === '') {
    return employees.value.filter(employee => {
      const firstName = employee.firstName?.toLowerCase();
      const lastName = employee.lastName?.toLowerCase();
      return (query === '' || firstName?.includes(query) || lastName?.includes(query));
    });
  } else {
    return employees.value.filter(employee => {
      const departmentName = employee.departmentName?.toLowerCase();
      const firstName = employee.firstName?.toLowerCase();
      const lastName = employee.lastName?.toLowerCase();
      return departmentName === selectedDept &&
        (query === '' || firstName?.includes(query) || lastName?.includes(query));
    });
  }
});

const props = defineProps({
  clearSearch: Function,
});

const clearSearchBox = () => {
  searchQuery.value = '';
  if (props.clearSearch) {
    props.clearSearch();
  }
};

const handleSearch = (query) => {
  searchQuery.value = query;
};

const clearSelection = () => {
  selectedDepartment.value = '';
  searchQuery.value = '';
  clearSearchBox();
};

const goToEmployeeDetail = (employeeID) => {
  router.push(`/employees/${employeeID}`);
};


onMounted(async () => {
  await fetchEmployees();
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
