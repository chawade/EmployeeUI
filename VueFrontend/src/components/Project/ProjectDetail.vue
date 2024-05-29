<template>
    <div class="container">
        <div v-if="project" class="project-detail detail">
            <h2><span>Project Details</span></h2>
            <h2>{{ project.projectName }}</h2>
            <p>Department: {{ project.department }}</p>
            <p>Start Date: {{ formatDate(project.startDate) || '-' }}</p>
            <p>End Date: {{ formatDate(project.endDate) || '-' }}</p>
            <div class="detail-link">
                <router-link to="/projects" class="btn btn-primary">Back to Projects</router-link>
                <button @click="editProject" class="btn btn-primary">Edit</button>
                <button @click="deleteProject" class="btn btn-danger">Delete</button>
            </div>
        </div>
        <div class="notfound" v-else>
            <Notfound/>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { apiService } from '@/function/ApiService.js';
import Notfound from '../Notfound.vue';

const project = ref(null);
const route = useRoute();
const router = useRouter();
const projectId = route.params.id;

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
};

const fetchProject = async () => {
    try {
        
        if (projectId) {
            const response = await apiService.getProjectById(projectId);
            console.log('fetchProject:', response.value);
            if (response && response.length > 0) {
                project.value = response[0];
            }
        }
    } catch (error) {
        console.error('Error fetching project details:', error);
    }
};

const deleteProject = async () => {
    try {
        const confirmed = confirm('Are you sure you want to delete this employee?');
        if (confirmed) {
            await apiService.deleteProject(projectId);
            router.push('/projects');
        }
    } catch (error) {
        console.error('Error deleting employee:', error);
    }
};

const editProject = () => {
    const projectId = route.params.id;
    router.push(`/projects/${projectId}/edit-project`);
};

onMounted(() => {
    fetchProject();
});
</script>

<style scoped>
.project-detail {
    margin: 20px;
}
</style>