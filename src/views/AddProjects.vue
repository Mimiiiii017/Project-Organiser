<script setup>
import { reactive } from "vue";
import Form from "../components/form.vue";

const user = reactive({
  name: "",
  description: "",
  hoursSpent: null,
  category: [],
});

function setUserData(name2, description2, hoursSpent2, category2) {
  user.name = name2;
  user.description = description2;
  user.hoursSpent = hoursSpent2;
  user.category = category2;
}
</script>

<template>
  <div class="container">
    <div>
      <Form @set-data="setUserData()" />
    </div>
  </div>
</template>

<style>
.container {
  margin-top: 100px;
  padding: 0 20px;
}

* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

.transition-button {
  transition: transform 0.3s;
}
.transition-button:active {
  transform: scale(0.8);
}
</style>
