<script setup lang="ts">
const { width, heigth, shape } = withDefaults(
  defineProps<{
    width?: string;
    heigth?: string;
    shape?: "circle" | "square";
  }>(),
  {
    width: "100%",
    heigth: "40px",
    shape: "square",
  }
);
</script>

<template>
  <div
    class="bg-gray-300 animate-pulse"
    :class="[shape === 'circle' ? 'rounded-full' : 'rounded-lg']"
    :style="{
      width: width,
      height: heigth,
    }"
  />
</template>
