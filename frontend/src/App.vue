<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import api from '@/services/api'

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const data = ref('Loading...')


onMounted(async () => {
  try {
    const response = await api.get('/')

    console.log('API Response:', response.data)

    data.value = response.data.message
  } catch (error) {
    console.error('API Error:', error)

    data.value = 'API Error'
  }
})
</script>

<template>
   <Header />
  <router-view />
   <Footer />
</template>