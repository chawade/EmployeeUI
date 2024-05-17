<!-- SearchBox.vue -->
<script setup>

import { ref } from 'vue';
import { apiService } from '../function/GetListEmp.js';

const searchQuery = ref('');

const search = async () => {
  try {
    const result = await apiService.searchEmployees(searchQuery.value);
    // Do something with the search result
  } catch (error) {
    console.error('Error searching employees:', error);
  }
};
</script>

<template>
  <div class="search-box">
    <input type="text" placeholder="Search..." v-model="searchQuery">
    <button @click="search">Search</button>
  </div>
</template>

<style scoped>
.search-box {
  display: flex;
  width: 30%;
  background: var(--color-white);
  color: var(--color-light);
  border-color: var(--color-white);
  border: 3px solid var(--color-danger);
  border-radius: 50px;
  text-transform: uppercase;
  align-items: center;
  font-size: 16px;
  margin: 12px 0 12px auto;
  padding: 0 auto;
  transition: var(--transition);
}

.search-box input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 10px 20px;
  font-size: 16px;
  outline: none;
}

.search-box button {
  background-color: var(--color-danger);
  border-radius: 50px;
  padding: 10px 20px;
  border: none;
  color: var(--color-white);
  cursor: pointer;
  font-size: 16px;
  outline: none;
  margin-left: 10px;
}

.search-box button:hover {
  background-color: var(--color-light);
}
</style>
