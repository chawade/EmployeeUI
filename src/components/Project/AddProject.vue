<template>
    <div class="container add-container">
        <div class="add-l">
            <li><router-link to="/projects">Back</router-link></li>
            <h1>Add New Project</h1>
        </div>
        <form @submit.prevent="submitProject">
            <div class="form-group">
                <label for="projectName">Project Name:</label>
                <input type="text" id="projectName" v-model="project.projectName" required />
            </div>
            <div class="form-group">
                <label for="departmentID">Department:</label>
                <select id="departmentID" v-model="selectedDepartment" class="dept-select">
                    <option v-for="dept in departments" :key="dept.departmentID" :value="dept.departmentID">
                        {{ dept.departmentName }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="startDate">Start Date:</label>
                <input type="date" id="startDate" v-model="project.startDate" />
            </div>
            <div class="form-group">
                <label for="endDate">End Date:</label>
                <input type="date" id="endDate" v-model="project.endDate" />
            </div>
            <div class="add-submit">
                <button type="submit" class="btn btn-danger">Submit</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { apiService } from '@/function/ApiService';

const router = useRouter();

const project = ref({
    projectName: '',
    departmentID: 1,
    startDate: '',
    endDate: ''
});

const departments = ref([]);
const selectedDepartment = ref(1);

const fetchDepartments = async () => {
    try {
        const response = await apiService.getDepartments();
        departments.value = response;
    } catch (error) {
        console.error('Error fetching departments:', error);
    }
};

const submitProject = async () => {
    try {
        project.value.startDate = project.value.startDate.trim() === '' ? null : project.value.startDate;
        project.value.endDate = project.value.endDate.trim() === '' ? null : project.value.endDate;

        project.value.departmentID = selectedDepartment.value;
        await apiService.addProject(project.value);
        project.value = {
            projectName: '',
            departmentID: 1,
            startDate: '',
            endDate: ''
        };
        router.push(`/projects`);
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    fetchDepartments();
});

</script>
