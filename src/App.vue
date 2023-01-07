<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@components/ui_palette/Navbar.vue";
</script>

<template>
  <Navbar />
  <div class="max-w-screen-md mx-auto px-8 lg:px-0 pt-[70px]">
    <RouterView />
  </div>
</template>
