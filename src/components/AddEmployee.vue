<script setup>
// import { ref, onMounted } from 'vue';
// import { apiService } from '@/components/AddEmployee.js';

// const employees = ref([]);

// const AddEmployees = async () => {
//   try {
//     const data = await apiService.AddEmployees();
//   } catch (error) {
//     console.error(error);
//   }
// };

// onMounted(AddEmployees);
// };

</script>

<template>
    <div class="container add-container">
        <h1>Add New Employee</h1>
        <!-- <form @submit.prevent="submitEmployee">
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
                <input type="email" id="email" v-model="employee.email" required />
            </div>
            <div class="form-group">
                <label for="gender">Gender:</label>
                <select id="gender" v-model="employee.gender" required>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>
            </div>
            <div class="form-group">
                <label for="projectName">Project Name:</label>
                <input type="text" id="projectName" v-model="employee.projectName" required />
            </div>
            <div class="form-group">
                <label for="jobTitle">Job Title:</label>
                <input type="text" id="jobTitle" v-model="employee.jobTitle" required />
            </div>
            <button type="submit">Submit</button> -->
        <!-- </form> -->
    </div>
</template>