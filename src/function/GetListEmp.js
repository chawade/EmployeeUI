// function.js

import axios from 'axios';

// ฟังก์ชันเรียกข้อมูลทั้งหมดของพนักงาน
export async function getAllEmployees() {
  try {
    const response = await axios.get('https://your-dotnet-api-url/api/Employee/GetAllEmployee');
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching all employees:', error);
    return null;
  }
}

// ฟังก์ชันอัปเดตข้อมูลพนักงาน
export async function updateEmployee(updatedEmp) {
  try {
    const response = await axios.put('https://your-dotnet-api-url/api/Employee/UpdateEmployee', updatedEmp);
    if (response.status === 200) {
      return 'Successfully updated!';
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error updating employee:', error);
    return null;
  }
}

// ฟังก์ชันเพิ่มข้อมูลพนักงาน
export async function addEmployee(addEmp) {
  try {
    const response = await axios.post('https://your-dotnet-api-url/api/Employee/AddEmployee', addEmp);
    if (response.status === 200) {
      return 'Successfully added!';
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error adding employee:', error);
    return null;
  }
}

// ฟังก์ชันลบข้อมูลพนักงาน
export async function deleteEmployee(id) {
  try {
    const response = await axios.delete(`https://your-dotnet-api-url/api/Employee/DeleteEmployee?id=${id}`);
    if (response.status === 200) {
      return 'Successfully deleted!';
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error deleting employee:', error);
    return null;
  }
}

// ฟังก์ชันค้นหาข้อมูลพนักงาน
export async function searchEmployees(text) {
  try {
    const response = await axios.get('https://your-dotnet-api-url/api/Employee/SearchEmployee', { params: { text } });
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
