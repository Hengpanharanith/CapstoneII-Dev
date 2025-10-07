<script setup>
import { ref, onMounted } from "vue";

const { $axios } = useNuxtApp();
const tenants = ref([]);
const loading = ref(true);
const error = ref(null);

async function getData() {
  console.log("Fetching data from /tenants/plan/index");
  loading.value = true;
  try {
    const response = await $axios.get("/tenants/plan/index");
    tenants.value = response.data;
    console.log("Fetched tenants:", tenants.value);
  } catch (err) {
    if (err.code === "ECONNABORTED") {
      console.error("Request timed out:", err);
      error.value = "The request timed out. Please try again later.";
    } else {
      console.error("Axios error:", err);
      error.value = "Failed to load data";
    }
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getData();
});
</script>

<template>
  <div
    class="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
  >
    <div>
      <h1 class="text-5xl font-bold text-white">Welcome to Capstone II</h1>
      <p v-if="loading" class="text-xl text-gray-700">Loading...</p>
      <p v-if="error" class="text-red-500">{{ error }}</p>
      <ul v-if="!loading && !error">
        <li
          v-for="(value, key) in tenants"
          :key="key"
          class="text-xl text-white"
        >
          {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>
