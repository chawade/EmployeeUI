<template>
    <div class="container">
        <h2>Update Project</h2>
        <div v-if="project" class="project-form">
            <div class="form-group">
                <label for="projectName">Project Name:</label>
                <input type="text" id="projectName" v-model="project.projectName" class="form-control" required/>
            </div>
            <div class="form-group">
                <label for="departmentID">Department:</label>
                <select id="departmentID" v-model="selectedDepartment" class="dept-select" required>
                    <option v-for="dept in departments" :key="dept.departmentID" :value="dept.departmentID">
                        {{ dept.departmentName }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="startDate">Start Date:</label>
                <input type="date" id="startDate" v-model="project.startDate" class="form-control" />
            </div>
            <div class="form-group">
                <label for="endDate">End Date:</label>
                <input type="date" id="endDate" v-model="project.endDate" class="form-control" />
            </div>
            <div class="update-link">
                <button @click="goToProjectDetail(projectId)" class="btn btn-danger">Cancel</button>
                <button @click="updateProject" class="btn btn-primary">Update</button>
            </div>
        </div>

        <div v-else>
            <p>Loading project data...</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { apiService } from '@/function/ApiService';

const project = ref(null);
const departments = ref([]);
const selectedDepartment = ref('');
const route = useRoute();
const projectId = route.params.id;
const router = useRouter();

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const fetchProject = async () => {
    try {
        if (projectId) {
            const response = await apiService.getProjectById(projectId);
            console.log('fetchProject response:', response);
            if (response  && response.length > 0) {
                project.value = response[0];
                selectedDepartment.value = project.value.departmentID;
            }
        }
    } catch (error) {
        console.error('Error fetching project data:', error);
    }
};

const fetchDepartments = async () => {
    try {
        const response = await apiService.getDepartments();
        departments.value = response;
    } catch (error) {
        console.error('Error fetching departments:', error);
    }
};

const updateProject = async () => {
    try {
        if (project.value) {
            const formattedStartDate = formatDate(project.value.startDate);
            const formattedEndDate = formatDate(project.value.endDate);

            project.value.projectID = projectId;
            project.value.departmentID = selectedDepartment.value || project.value.departmentID;
            project.value.startDate = formattedStartDate || null;
            project.value.endDate = formattedEndDate || null;
            await apiService.updateProject(project.value);
            console.log('Project updated successfully');
            router.push(`/projects/${project.value.projectID}`);
        }
    } catch (error) {
        console.error('Error updating project:', error);
    }
};

const goToProjectDetail = (projectId) => {
    router.push(`/projects/${projectId}`);
};

onMounted(() => {
    fetchProject();
    fetchDepartments();
});

</script>

<style scoped>
.project-form {
    margin: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-control {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
</style>
