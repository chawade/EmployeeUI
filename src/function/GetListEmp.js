import axios from 'axios';

const baseURL = 'http://localhost:5105';

const apiService = {
  async getEmployees() {
    try {
    const response = await axios.get(`${baseURL}/api/Employee/GetEmployees`); 
    console.log(response.data);
    if (!response.data) {
      throw new Error('Network response was not ok');
    }
    return response.data;
  } catch (error) {
    alert(error.message);
  }
  },

  async searchEmployees(text) {
    try {
      const response = await axios.get(`${baseURL}/api/Employee/SearchEmployee`, { params: { text } });
      return response.data;
    } catch (error) {
      console.error('Error searching employees:', error);
      throw error;
    }
  }
};

export { apiService };
