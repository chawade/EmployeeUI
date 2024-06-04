<template>
    <div class="container add-container">
      <div class="add-l">
        <li><router-link to="/employees" class="btn btn-primary">Back</router-link></li>
        <h1>Add New Employees</h1>
      </div>
      <form @submit.prevent="submitEmployees">
        <table class="employee-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Job Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(employee, index) in employees" :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <input type="text" v-model="employee.firstName" required />
              </td>
              <td>
                <input type="text" v-model="employee.lastName" required />
              </td>
              <td>
                <input type="email" v-model="employee.email" />
              </td>
              <td>
                <select v-model="employee.gender">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </td>
              <td>
                <select v-model="employee.departmentID" class="dept-select">
                  <option v-for="dept in departments" :key="dept.departmentID" :value="dept.departmentID">
                    {{ dept.departmentName }}
                  </option>
                </select>
              </td>
              <td>
                <input type="text" v-model="employee.jobTitle" />
              </td>
              <td>
                <button type="button" @click="removeEmployee(index)" class="btn btn-danger">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="button" @click="addEmployee" class="btn btn-primary">Add Another Employee</button>
        <div class="add-submit">
          <button type="submit" class="btn btn-danger">Submit All</button>
        </div>
      </form>
    </div>
  </template>
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { apiService } from '@/function/ApiService';
  
  const router = useRouter();
  const departments = ref([]);
  const employees = ref([
    {
      firstName: '',
      lastName: '',
      email: '',
      gender: 'Other',
      departmentID: null,
      jobTitle: ''
    }
  ]);
  
  const fetchDepartments = async () => {
    try {
      const response = await apiService.getDepartments();
      departments.value = response;
      if (response.length > 0) {
        employees.value.forEach(employee => {
          employee.departmentID = response[0].departmentID;
        });
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };
  
  const addEmployee = () => {
    employees.value.push({
      firstName: '',
      lastName: '',
      email: '',
      gender: 'Other',
      departmentID: departments.value.length > 0 ? departments.value[0].departmentID : null,
      jobTitle: ''
    });
  };
  
  const removeEmployee = (index) => {
    if (employees.value.length > 1) {
      employees.value.splice(index, 1);
    } else {
      alert('You must have at least one employee.');
    }
  };
  
  const submitEmployees = async () => {
    try {
      await Promise.all(employees.value.map(employee => apiService.addEmployee(employee)));
      employees.value = [
        {
          firstName: '',
          lastName: '',
          email: '',
          gender: 'Other',
          departmentID: departments.value.length > 0 ? departments.value[0].departmentID : null,
          jobTitle: ''
        }
      ];
      router.push('/employees');
    } catch (error) {
      console.error('Error adding employees:', error);
    }
  };
  
  onMounted(() => {
    fetchDepartments();
  });
  </script>
 <style>
.employee-table select {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
}
</style>