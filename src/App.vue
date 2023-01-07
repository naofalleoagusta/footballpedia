<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@components/Navbar.vue";
</script>

<template>
  <Navbar />
  <div class="max-w-screen-lg mx-auto px-4 lg:p-0">
    <RouterView />
  </div>
</template>
