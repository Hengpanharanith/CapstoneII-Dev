<script setup>
import { ref, onMounted } from 'vue';

const { $axios } = useNuxtApp();
const tenants = ref([]);
const loading = ref(true);
const error = ref(null);

async function getData() {
  console.log('Fetching data from /tenants/plan/index');
  loading.value = true;
  try {
    const response = await $axios.get('/tenants/plan/index');
    tenants.value = response.data;
    console.log('Fetched tenants:', tenants.value);
  } catch (err) {
    if (err.code === 'ECONNABORTED') {
      console.error('Request timed out:', err);
      error.value = 'The request timed out. Please try again later.';
    } else {
      console.error('Axios error:', err);
      error.value = 'Failed to load data';
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
  <div class="flex items-center justify-center h-screen bg-blue-500">
    <div>
      <h1 class="text-4xl font-bold text-black">Tailwind CSS is working!</h1>
      <p v-if="loading" class="text-gray-700">Loading...</p>
      <p v-if="error" class="text-red-500">{{ error }}</p>
      <ul v-if="!loading && !error">
        <li v-for="tenant in tenants" :key="tenant.id" class="text-black">
          {{ tenant.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
