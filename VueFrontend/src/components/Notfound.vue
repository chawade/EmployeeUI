<template>
  <div id="notfound">
    <div class="notfound">
      <div class="notfound-404">
        <h1>4<span><img :src="emoji" alt="emoji"></span>4</h1>
      </div>
      <h2>Oops! Page Not Be Found</h2>
      <p>Sorry but the page you are looking for does not exist, have been removed. Name changed or is temporarily
        unavailable</p>
      <router-link to="/" class="btn btn-danger">Back to homepage</router-link>
    </div>
  </div>
</template>

<script setup>
import emoji from '@/assets/img/emoji.png';
</script>

<style scoped>
#notfound {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
}

.notfound {
  max-width: 520px;
  width: 90%;
  display: flex;
  flex-direction: column;
  text-align: center;
  line-height: 1.4;
  gap: 16px;
}

.notfound .notfound-404 h1 {
  font-size: 146px;
  font-weight: 700;
  margin: 0;
  color: var(--color-white);
}

.notfound .notfound-404 h1>span {
  display: inline-block;
  width: 120px;
  height: 120px;
  background-size: cover;
  transform: scale(1.4);
  z-index: -1;
}

.notfound h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
  color: var(--color-white);
}

.notfound p {
  color: var(--color-light);
  font-weight: 300;
}

.notfound a:hover {
  opacity: 0.8;
}

@media only screen and (max-width: 767px) {
  .notfound .notfound-404 {
    height: 115px;
  }

  .notfound .notfound-404 h1 {
    font-size: 86px;
  }

  .notfound .notfound-404 h1>span {
    width: 86px;
    height: 86px;
  }
}
</style>
