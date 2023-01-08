<script setup lang="ts">
const { title } = defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <div
    id="page-title"
    class="duration-500 ease-in-out transition-maxHeight max-h-[250px] overflow-hidden"
  >
    <h1 class="text-5xl">{{ title }}</h1>
    <p class="text-lg mt-2 mb-[10vh]">
      {{ subtitle }}
    </p>
  </div>
</template>
