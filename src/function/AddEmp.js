import { ref } from 'vue';

const apiService = {
  setup() {
    const employee = ref({
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      projectName: '',
      jobTitle: ''
    });

    const submitEmployee = async () => {
      try {
        const response = await fetch('https://localhost:5173/api/Employee/AddEmployee', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(employee.value)
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        alert('Employee added successfully!');
        resetForm();
      } catch (error) {
        console.error('Error adding employee:', error);
        alert('Error adding employee: ' + error.message);
      }
    };

    const resetForm = () => {
      employee.value = {
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        projectName: '',
        jobTitle: ''
      };
    };

    return {
      employee,
      submitEmployee
    };
  }
};

export { apiService };

// async saveEmployee(formData) {
//   try {
//     const saveData = await axios.post(
//       `${baseURL}/api/Employee/SaveEmployee`,
//       {
//         EmployeeID: 0,
//         FirstName: formData.fname,
//         LastName: formData.lname,
//         Email: formData.email,
//         Gender: formData.gender,
//         DepartmentID: parseInt(formData.department),
//         JobTitle: formData.position
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "Cache-Control": "no-store",
//         }
//       }
//     );
//     return saveData.data;
//   } catch (error) {
//     console.error('Error saving employee data:', error);
//     throw error;
//   }
// },