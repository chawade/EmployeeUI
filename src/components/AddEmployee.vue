<script setup>
import { ref } from 'vue';
import { apiService } from '../function/ApiService.js';

const employee = ref({
  firstName: '',
  lastName: '',
  email: '',
  gender: 'Other',
  departmentID: 'IT',
  jobTitle: ''
});

const submitEmployee = async () => {
  try {
    await apiService.addEmployee(employee.value);
    employee.value = {
      firstName: '',
      lastName: '',
      email: '',
      gender: 'Other',
      departmentID: 'IT',
      jobTitle: ''
    };
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
    <div class="container add-container">
        <h1>Add New Employee</h1>
        <form @submit.prevent="submitEmployee">
            <div class="form-group">
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" v-model="employee.firstName" required />
            </div>
            <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" v-model="employee.lastName" required />
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="employee.email" />
            </div>
            <div class="form-group">
                <label for="gender">Gender:</label>
                <select id="gender" v-model="employee.gender">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>
            </div>
            <div class="form-group">
                <label for="departmentID">Department Name:</label>
                <select id="departmentID" v-model="employee.departmentID" required >
                    <option value="1">IT</option>
                    <option value="2">HR</option>
                    <option value="3">Margeting</option>
                    <option value="4">Logistic</option>
                </select>
            </div>
            <div class="form-group">
                <label for="jobTitle">Job Title:</label>
                <input type="text" id="jobTitle" v-model="employee.jobTitle"/>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>