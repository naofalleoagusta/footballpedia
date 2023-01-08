<script setup lang="ts">
const { text } = withDefaults(
  defineProps<{
    text?: "Page" | "Team" | "Area" | "Player";
  }>(),
  {
    text: "Page",
  }
);
</script>

<template>
  <div class="mt-[10vh]">
    <h1 class="text-5xl mb-[20px]">{{ text }} not found/has been removed.</h1>
    <span class="text-2xl"
      >Go back, <RouterLink to="/" class="underline">Home</RouterLink> ?</span
    >
  </div>
</template>
