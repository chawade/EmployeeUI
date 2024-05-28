<!-- EmployeesView.vue -->
<script setup>
import { ref } from 'vue';
import apiService from '@/function/ApiService.js';
import router from '@/router';

const fname = ref('');
const lname = ref('');
const email = ref('');
const department = ref('กรุณาเลือกแผนก');
const position = ref('');
const gender = ref('กรุณาเลือกเพศ');

async function saveData() {
    const formData = {
        fname: fname.value,
        lname: lname.value,
        email: email.value,
        department: department.value,
        position: position.value,
        gender: gender.value
    };
    
    try {
        const data = await apiService.SaveEmployee(formData);
        if (data === 1) {
            window.alert("Save Employee Complete");
            window.location.reload();
        }
    } catch (error) {
        console.error('Error saving employee data:', error);
    }
}
</script>
