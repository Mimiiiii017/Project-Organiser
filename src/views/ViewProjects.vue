<template>
  <div id="container">
    <section v-if="projects.length > 0">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Hours Spent on Project</th>
            <th scope="col">Category</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <transition-group tag="tbody" name="list" appear>
          <tr v-for="project in projects" :key="project.id">
            <td>{{ uppercaseName(project) }}</td>
            <td>{{ lowercaseDescription(project) }}</td>
            <td>{{ plusHours(project) }}</td>
            <td>
              <ul>
                <li v-for="category in project.category" :key="category">
                  {{ firstThreeCategory(category) }}
                </li>
              </ul>
            </td>
            <td>
              <div class="button-group">
                <button
                  @click="deleteProject(project.id)"
                  class="btn btn-danger"
                >
                  <img src="@/assets/trash.png" alt="Delete" class="icon" />
                </button>
                <button @click="editProject(project)" class="btn btn-primary">
                  Edit
                </button>
              </div>
            </td>
          </tr>
        </transition-group>
      </table>
    </section>

    <section v-else>
      <p>No projects added yet.</p>
    </section>

    <div>
      <div v-if="isEditing">
        <form @submit.prevent="updateProject">
          <h3 id="title">Edit Project</h3>
          <div id="field" class="mb-3">
            <label id="edit-field" for="projectName" class="form-edit"
              >Name</label
            >

            <input
              id="projectName"
              v-model="editForm.name"
              type="text"
              class="form-control"
            />
          </div>
          <div id="field" class="mb-3">
            <label id="edit-field" for="description" class="form-label"
              >Description</label
            >
            <textarea
              id="description"
              v-model="editForm.description"
              class="form-control"
            ></textarea>
          </div>

          <div id="field" class="mb-3">
            <label id="edit-field" for="hoursSpent" class="form-label"
              >Hours Spent</label
            >
            <textarea
              id="hoursSpent"
              v-model="editForm.hoursSpent"
              class="form-control"
            ></textarea>
          </div>
          <div id="field" class="mb-3">
            <label id="edit-field" class="form-label">Category</label>

            <div
              class="form-check"
              v-for="category in availableCategories"
              :key="category"
            >
              <input
                class="form-check-input"
                type="checkbox"
                :value="category"
                v-model="editForm.category"
              />
              <label class="form-check-label">{{ category }}</label>
            </div>
          </div>

          <div class="button-group">
            <button
              type="submit"
              id="field"
              class="btn btn-save"
              @click="updateProject"
            >
              Save
            </button>
            <button
              type="button"
              id="field"
              class="btn btn-cancel"
              @click="cancelEdit"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref, computed } from "vue";
import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef, remove } from "firebase/database";
import "../assets/trash.png";

const firebaseConfig = {
  apiKey: "AIzaSyC-Ev88Emy-CUTpTR-TF_XRHNi8dg7C9A0",
  authDomain: "diy-project-organizer.firebaseapp.com",
  databaseURL:
    "https://diy-project-organizer-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "diy-project-organizer",
  storageBucket: "diy-project-organizer.firebasestorage.app",
  messagingSenderId: "705784678900",
  appId: "1:705784678900:web:358d13ef3ae768f98911a1",
  measurementId: "G-VMMFVH8W1V",
};
const uppercaseName = computed(
  () => (project) => project.name.trim().toUpperCase()
); // Name in uppercase

const lowercaseDescription = computed(
  () => (project) => project.description.trim().toLowerCase()
); // Description in lowercase

const plusHours = computed(() => (project) => project.hoursSpent + "+"); // adding + sign

const firstThreeCategory = computed(
  () => (category) => category.trim().slice(0, 3)
); // First 3 letters

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const projects = ref([]);
const isEditing = ref(false);
const availableCategories = [
  "Woodworking",
  "Painting And Drawing",
  "Electronics And Coding",
  "Gardening And Landscaping",
  "Other",
];
const editForm = reactive({
  id: "",
  name: "",
  description: "",
  hoursSpent: null,
  category: [],
});

onMounted(async () => {
  console.log("Fetching project data...");
  try {
    const response = await fetch(
      "https://diy-project-organizer-default-rtdb.europe-west1.firebasedatabase.app/projects.json",
      {
        method: "GET",
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      console.error("Error fetching projects.");
    }

    const results = [];
    for (const id in responseData) {
      results.push({
        id,
        name: responseData[id].name,
        description: responseData[id].description,
        hoursSpent: responseData[id].hoursSpent,
        // Convert single strings to arrays if necessary
        category: Array.isArray(responseData[id].category)
          ? responseData[id].category
          : responseData[id].category.split(","),
      });
    }
    projects.value = results;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

function editProject(project) {
  isEditing.value = true;
  editForm.id = project.id;
  editForm.name = project.name;
  editForm.description = project.description;
  editForm.hoursSpent = project.hoursSpent;
  editForm.category = [...project.category];
}

function cancelEdit() {
  isEditing.value = false;
}

async function updateProject() {
  try {
    const response = await fetch(
      `https://diy-project-organizer-default-rtdb.europe-west1.firebasedatabase.app/projects/${editForm.id}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editForm.name,
          description: editForm.description,
          hoursSpent: editForm.hoursSpent,
          category: editForm.category,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update project");
    }

    const index = projects.value.findIndex(
      (project) => project.id === editForm.id
    );
    if (index !== -1) {
      projects.value[index] = {
        id: editForm.id,
        name: editForm.name,
        description: editForm.description,
        hoursSpent: editForm.hoursSpent,
        category: [...editForm.category],
      };
    }

    console.log("Project updated successfully");
    isEditing.value = false;
  } catch (error) {
    console.error("Error updating project:", error);
  }
}

async function deleteProject(id) {
  try {
    const projectRef = dbRef(database, `projects/${id}`);
    await remove(projectRef);

    projects.value = projects.value.filter((project) => project.id !== id);

    console.log("Project deleted successfully");
  } catch (error) {
    console.error("Error deleting project:", error);
  }
}
</script>

<style scoped>
#container {
  margin-top: 150px;
}

section {
  margin: 0 auto;
  width: 100%;
  border-radius: 12px;
  background-color: #ffeaca;
  border: 5px solid #924e00;
}

.edit {
  margin: auto;
  padding: 4rem;
  border-radius: 10px;
  border: none;
  margin-top: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  background-color: #ffffff;
}

form {
  margin-top: 50px !important;
  margin: auto;
  font-size: 20px;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
  width: auto;
}

th,
td {
  text-align: left;
  padding: 15px;
  vertical-align: middle;
  border-bottom: 1px solid #924e00;
}

th {
  background-color: #ffeaca;
  color: #924e00;
  border-bottom: 2px solid #924e00;
}

.button-group {
  display: flex;
  gap: 10px;
}

.icon {
  width: 16px;
  height: 16px;
}

button {
  background: none;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.btn.btn-danger {
  background-color: #d91e18;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
}

.btn.btn-primary {
  background-color: #2e74b8;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
}

.btn.btn-cancel {
  background-color: #6c757d;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  margin-right: 30px;
}

.btn.btn-save {
  background-color: #924e00;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  margin-right: 30px;
}

button:hover {
  opacity: 0.8;
}

button:active {
  transform: scale(0.9);
  transition: transform 0.2s ease;
}

#edit-field {
  padding-right: 10px;
}

#title {
  font-family: sans-serif;
  font-weight: 600;
  color: #924e00;
}

.list-enter-active,
.list-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
