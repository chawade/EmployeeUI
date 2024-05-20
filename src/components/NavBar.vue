<template>
    <nav>
        <div class="nav-container">
            <router-link to="/">Employees Management</router-link>
            <ul class="nav-links">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/employees">Employee</router-link></li>
                <li><router-link to="/add-employee">Add Employee</router-link></li>
            </ul>
        </div>
    </nav>
</template>

<style scoped>
nav {
    height: 3rem;
    display: grid;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 10;
    font-family: 'mali', Bold;
}

.nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 3rem;
    background-color: var(--color-white);
    max-width: none;
}

.nav-container a{
    color: var(--color-dark);
}

.nav-links {
    display: flex;
    gap: 3rem;
}

.nav-links ul li {
    list-style: none;
}

.nav-links li a {
    transition: .4 ease;
}

.nav-links li a:hover {
    color: var(--color-danger);

}

.nav-links .router-link-exact-active {
    color: var(--color-primary);
}
</style>