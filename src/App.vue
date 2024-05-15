<!-- App.vue -->

<script setup>
import Emp from './components/Employees.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <main>
    <router-link to="/">Employees</router-link>
    
    <router-view></router-view>
    <NavBar/>
    <Emp/>
  </main>
</template>
