<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const data = ref('Loading...')

onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/')
    console.log("API Response:", response)
    data.value = response.data.message
  } catch (error) {
    console.log("Error:", error.response)
    console.log("Full Error:", error)
    data.value = 'API Error'
  }
})
</script>

<template>
  <h1>{{ data }}</h1>
</template>