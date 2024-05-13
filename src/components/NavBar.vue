<template>
    <nav>
        <div class="container nav-container">
            <h5>Employees Management</h5>
            <ul class="nav-links">
                <li>
                    <a href='#'>Employees</a>
                </li>
                <li>
                    <a href='#'>Departments</a>
                </li>
                <li>
                    <a href='#'>Projects</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style scoped>
h5{
    color: black;
    font-size: 20px;
}
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
    background-color: white;
    max-width: none;
}

.nav-links {
    display: flex;
    gap: 3rem;
}

.nav-links ul li {
    list-style: none;
}

.nav-links li a {
    color: black;
    transition: .4 ease;
}

.nav-links li a:hover {
    color: orange;

}

</style>