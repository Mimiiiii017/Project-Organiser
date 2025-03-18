<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const showMenu = ref(false);
const router = useRouter();

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div class="app-container">
    <nav>
      <img
        src="@/assets/arrow.png"
        alt="Arrow"
        class="arrow-icon"
        @click="goBack"
      />
      <div :class="['links-container', { open: showMenu }]">
        <router-link to="/">Home</router-link>
        <router-link to="/AddProjects">Add Projects</router-link>
        <router-link to="/ViewProjects">My Projects</router-link>
      </div>
      <img
        src="@/assets/burger.png"
        alt="Menu"
        class="burger-icon"
        @click="toggleMenu"
      />
    </nav>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #fdf8f4;
  box-sizing: border-box;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<style scoped>
.app-container {
  background-color: #fdf8f4;
  width: 100%;
  min-height: 100vh;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 1200px;
  height: 70px;
  background-color: #ffeaca;
  font-size: 16px;
  text-align: center;
  padding: 6px;
  border-radius: 30px;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e6b788;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.arrow-icon {
  height: 30px;
  margin-left: 20px;
  cursor: pointer;
}

.burger-icon {
  height: 30px;
  margin-right: 20px;
  cursor: pointer;
  display: none;
}

nav a {
  display: inline-block;
  padding: 0.5rem 1rem;
  margin-left: 10px;
  margin-right: 10px;
  color: rgb(0, 0, 0);
  text-decoration: none;
  font-weight: 400;
  font-size: 16px;
  transition: transform 0.3s ease, color 0.3s ease;
}

nav a:hover {
  color: #bd7100;
  transform: scale(1.2);
  background-color: #ffeaca;
  font-weight: 600;
}

nav a.router-link-exact-active {
  color: rgb(146, 78, 0);
  font-weight: 800;
  font-size: 26px;
}

body {
  padding-top: 100px;
}

.links-container {
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

@media (max-width: 768px) {
  .burger-icon {
    display: block;
  }

  .links-container {
    display: none;
    width: 100%;
  }

  .links-container.open {
    display: block;
    background-color: #ffeaca;
    border: 1px solid #e6b788;
    border-radius: 10px;
    width: 80%;
    margin: 0 auto;
    padding-bottom: 1rem;
  }

  nav a {
    display: block;
    margin: 10px 0;
  }

  nav {
    height: auto;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>