import axios from 'axios';

const baseURL = 'http://localhost:5173';

const apiService = {
  async getEmployees() {
    try {
      const response = await axios.get(`${baseURL}/api/Employee/GetAllEmployees`);
      return response.data;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  },
  
  async saveEmployee(formData) {
    try {
      const saveData = await axios.post(
        `${baseURL}/api/Employee/SaveEmployee`,
        {
          EmployeeID: 0,
          FirstName: formData.fname,
          LastName: formData.lname,
          Email: formData.email,
          Gender: formData.gender,
          DepartmentID: parseInt(formData.department),
          JobTitle: formData.position
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          }
        }
      );
      return saveData.data;
    } catch (error) {
      console.error('Error saving employee data:', error);
      throw error;
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
  },
};

export { apiService };
