<script setup>
</script>

<template>
    <header>
        <div class="container home-container">
            <div class="l-home">
                <h1>Welcome</h1>
                <span>to Employees Management System</span>
            </div>
            <div class="r-home">
                <li><router-link to="/employees" class="btn btn-primary">Employees</router-link></li>
                <li><router-link to="/departments" class="btn btn-primary">Departments</router-link></li>
                <li><router-link to="/projects" class="btn btn-primary">Projects</router-link></li>
            </div>
        </div>
    </header>
</template>

<style scoped>
</style>