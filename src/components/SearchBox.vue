<!-- SearchBox.vue -->
<script setup>

import { ref, watch } from 'vue';
import { debounce } from 'lodash-es';

// import 'primeicons/primeicons.css'

const searchQuery = ref('');

const emit = defineEmits(['search']);

const handleSearch = debounce(() => {
  emit('search', searchQuery.value);
}, 300);

watch(searchQuery, handleSearch);

</script>

<template>
  <div class="search-box">
    <input type="text" placeholder="Search..." v-model="searchQuery">
  </div>
</template>

<style scoped>
.search-box {
  display: block;
  height: 50px;
  width: fit-content;
  background: var(--color-white);
  color: var(--color-light);
  border-color: var(--color-white);
  border: 3px solid var(--color-danger);
  border-radius: 50px;
  text-transform: uppercase;
  align-items: center;
  font-size: 16px;
  transition: var(--transition);
  margin: auto;
}

.search-box input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 10px 20px;
  font-size: 16px;
  outline: none;
}
/* 
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
} */

.search-box button:hover {
  background-color: var(--color-light);
}
</style>
