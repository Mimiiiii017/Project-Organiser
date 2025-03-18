<template>
  <div id="app">
    <div class="container">
      <transition name="message">
        <div class="message" v-if="showMessage">
          <h1>Welcome to DIY Project Tracker</h1>
          <p>
            Track your DIY projects, organize your ideas, and stay motivated as
            you bring your creations to life. Add new projects, keep track of
            progress, and manage your creative journey all in one place!
          </p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showMessage = ref(true);
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-family: "Arial", sans-serif;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 20px;
}

.message {
  background-color: #ffffff;
  border-radius: 15px;
  padding: 40px;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease-in-out;
}

.message:hover {
  transform: scale(1.2);
}

/* Transition classes for message div */
.message-enter-active, .message-leave-active {
  transition: transform 0.3s ease-in-out;
}

.message-enter, .message-leave-to /* .message-leave-active in <2.1.8 */ {
  transform: scale(1);
}
</style>