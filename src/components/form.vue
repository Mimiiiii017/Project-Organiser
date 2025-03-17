<script setup>
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  maxLength,
  minLength,
  alpha,
  alphaNum,
  helpers,
  numeric,
} from "@vuelidate/validators";

const state = reactive({
  name: "",
  description: "",
  hoursSpent: 0,
  category: [],
});

const rules = {
  name: {
    required,
    maxLength: maxLength(30),
    alpha: helpers.regex(/^[A-Za-z\s]+$/),
  },
  description: {
    required,
    minLength: minLength(5),
    maxLength: maxLength(300),
    alphaNum: helpers.regex(/^[A-Za-z0-9\s.,'!?-]+$/),
  },
  hoursSpent: {
    required,
    numeric,
  },
  category: {
    required,
  },
};

const v$ = useVuelidate(rules, state);

async function submitForm() {
  v$.value.$touch();
  if (v$.value.$invalid) {
    console.log("Form is invalid");
    return;
  }

  console.log("Name:", state.name);
  console.log("Description:", state.description);
  console.log("Hours Spent:", state.hoursSpent);
  console.log("Selected Categories (Checkboxes):", state.category);

  const response = await fetch(
    "https://diy-project-organizer-default-rtdb.europe-west1.firebasedatabase.app/projects.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: state.name,
        description: state.description,
        hoursSpent: state.hoursSpent,
        category: state.category,
      }),
    }
  );

  if (!response.ok) {
    alert("Failed to submit. Please try again.");
    return;
  }

  alert("Project Added.");
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <!-- Project Name Field -->
    <div class="form-group" :class="{ 'is-invalid': v$.name.$error }">
      <label class="form-label">Project Name</label>
      <input
        id="name"
        name="name"
        type="text"
        class="form-control"
        v-model.trim="state.name"
        @blur="v$.name.$touch()"
        :class="{ 'is-invalid': v$.name.$error }"
      />

      <div v-if="v$.name.$error" class="text-danger">
        <div v-for="(error, index) in v$.name.$errors" :key="index">
          Project Name must only contain letters and be under 30 characters!
        </div>
      </div>
    </div>
    <br />

    <!-- Description Field -->
    <div class="form-group" :class="{ 'is-invalid': v$.description.$error }">
      <label class="form-label">Description</label>
      <textarea
        id="description"
        name="description"
        class="form-control"
        v-model.trim="state.description"
        @blur="v$.description.$touch()"
        :class="{ 'is-invalid': v$.description.$error }"
      ></textarea>

      <div v-if="v$.description.$error" class="text-danger">
        <div v-for="(error, index) in v$.description.$errors" :key="index">
          Description must be alphanumeric and between 5-300 characters!
        </div>
      </div>
    </div>
    <br />

    <!-- Hours Spent Field -->
    <div class="form-group" :class="{ 'is-invalid': v$.hoursSpent.$error }">
      <label class="form-label">Hours Spent</label>
      <input
        id="hoursSpent"
        name="hoursSpent"
        type="number"
        class="form-control"
        v-model.trim="state.hoursSpent"
        @blur="v$.hoursSpent.$touch()"
        :class="{ 'is-invalid': v$.hoursSpent.$error }"
      />
      <div v-if="v$.hoursSpent.$error" class="text-danger">
        <div v-for="(error, index) in v$.hoursSpent.$errors" :key="index">
          Please enter a number!
        </div>
      </div>
    </div>
    <br />

    <!-- Category Selection -->
    <div class="form-group" :class="{ 'is-invalid': v$.category.$error }">
      <label class="form-label">Category</label>

      <!-- Woodworking checkbox -->
      <div class="form-check">
        <input
          @blur="v$.category.$touch()"
          @change="v$.category.$touch()"
          class="form-check-input"
          type="checkbox"
          value="Woodworking"
          id="category1"
          v-model="state.category"
          :class="{ 'is-invalid': v$.category.$error }"
        />
        <label class="form-check-label" for="category1"> Woodworking </label>
      </div>

      <!-- Painting and Drawing checkbox -->
      <div class="form-check">
        <input
          @blur="v$.category.$touch()"
          @change="v$.category.$touch()"
          class="form-check-input"
          type="checkbox"
          value="Painting And Drawing"
          v-model="state.category"
          id="category2"
          :class="{ 'is-invalid': v$.category.$error }"
        />
        <label class="form-check-label" for="category2">
          Painting and Drawing
        </label>
      </div>

      <!-- Electronics and Coding checkbox -->
      <div class="form-check">
        <input
          @blur="v$.category.$touch()"
          @change="v$.category.$touch()"
          class="form-check-input"
          type="checkbox"
          value="Electronics And Coding"
          v-model="state.category"
          id="category3"
          :class="{ 'is-invalid': v$.category.$error }"
        />
        <label class="form-check-label" for="category3">
          Electronics and Coding
        </label>
      </div>

      <!-- Gardening and Landscaping checkbox -->
      <div class="form-check">
        <input
          @blur="v$.category.$touch()"
          @change="v$.category.$touch()"
          class="form-check-input"
          type="checkbox"
          value="Gardening And Landscaping"
          v-model="state.category"
          id="category4"
          :class="{ 'is-invalid': v$.category.$error }"
        />
        <label class="form-check-label" for="category4">
          Gardening and Landscaping
        </label>
      </div>

      <!-- Other checkbox -->
      <div class="form-check">
        <input
          @blur="v$.category.$touch()"
          @change="v$.category.$touch()"
          class="form-check-input"
          type="checkbox"
          value="Other"
          v-model="state.category"
          id="category5"
          :class="{ 'is-invalid': v$.category.$error }"
        />
        <label class="form-check-label" for="category5"> Other </label>
      </div>

      <div v-if="v$.category.$error" class="text-danger">
        <div v-for="(error, index) in v$.category.$errors" :key="index">
          Please choose at least one category!
        </div>
      </div>
    </div>

    <br />

    <transition name="button-click">
      <button
        class="btn transition-button btn-primary"
        type="submit"
        :disabled="
          v$.name.$invalid ||
          v$.description.$invalid ||
          v$.hoursSpent.$invalid ||
          v$.category.$invalid
        "
      >
        Add Project
      </button>
    </transition>
  </form>
</template>

<style>

form {
  margin-top: 150px;
  font-size: 20px;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
  width: auto;
}

.is-invalid label {
  color: red;
}

label {
  font-weight: bold;
}

.form-check-label {
  font-weight: normal;
}

.button-click-enter-active,
.button-click-leave-active {
  transition: transform 1.5s;
}
.button-click-enter,
.button-click-leave-to {
  transform: scale(0.8);
}
</style>
