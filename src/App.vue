<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <Navbar />
  <RouterView />
  <Footer />
</template>

<style>
body {
  background-color: #1f1f1f;
}
</style>
