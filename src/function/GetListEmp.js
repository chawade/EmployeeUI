// GetListEmp.js
import axios from 'axios';

const baseURL = 'http://localhost:5173';

const apiService = {
  getAllImportHeaders() {
    // Code for getAllImportHeaders function...
  },
  
  async SaveEmployee(formData) {
    // Code for SaveEmployee function...
  },

  async searchEmployees(text) {
    try {
      const response = await axios.get(`${baseURL}/api/Employee/SearchEmployee`, { params: { text } });
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error searching employees:', error);
      return null;
    }
  }
};

export { apiService }; // ส่งออกฟังก์ชัน apiService
