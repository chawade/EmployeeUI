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
  
  async getEmployeeById(employeeId){
    try {
      const response = await axios.get(`${baseURL}/Employee/GetEmployee/${employeeId}`);
      console.log('API response:', response.data);
      if (!response.data) {
        throw new Error('Failed to fetch employee');
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching employee:', error);
      throw error;
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

  async addEmployee(employee) {
    try {
      const response = await axios.post(`${baseURL}/Employee/AddEmployee`, employee);
      return response.data;
    } catch (error) {
      throw new Error('Failed to add employee: ' + error.message);
    }
  },


  async deleteEmployee(employeeId) {
    try {
      const response = await axios.delete(`${baseURL}/Employee/DeleteEmployee?id=${employeeId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  },
  async updateEmployee(employeeData) {
    try {
      const response = await axios.put(`${baseURL}/Employee/UpdateEmployee`, employeeData);
      return response.data;
    } catch (error) {
      throw new Error(`Error updating employee: ${error.message}`);
    }
  },
  
  /* Department Controller */

  async getDepartments() {
    try {
      const response = await axios.get(`${baseURL}/Department/GetDepartments`);
      console.log(response.data);
      if (!response.data) {
        throw new Error('Network response was not ok');
      }
      return response.data;
    } catch (error) {
      alert(error.message);
    }
  },
};



export { apiService };
