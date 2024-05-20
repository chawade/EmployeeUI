import axios from 'axios';

const baseURL = 'http://localhost:5105/api';

const apiService = {
  async getEmployees() {
    try {
    const response = await axios.get(`${baseURL}/Employee/GetEmployees`); 
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
      const response = await axios.get(`${baseURL}/Employee/SearchEmployee`, { params: { text } });
      return response.data;
    } catch (error) {
      console.error('Error searching employees:', error);
      throw error;
    }
  },

  // AddEmployee
  async addEmployee(employee) {
    try {
      const response = await axios.post(`${baseURL}/Employee/AddEmployee`, employee);
      return response.data;
    } catch (error) {
      throw new Error('Failed to add employee: ' + error.message);
    }
  },
  
  /* Department Controller */

  async selectDepartment(id) {
    try {
        const response = await axios.get(`${baseURL}/Department/GetEmployeeByDepartment/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to Select Department: ' + error.message);
    }
}




};



export { apiService };
