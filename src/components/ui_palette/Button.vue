<script setup lang="ts">
const { id, onClick, ariaLabel, classes } = defineProps<{
  id?: string;
  onClick?: () => void;
  ariaLabel?: string;
  classes?: string[];
}>();
</script>

<template>
  <button
    :id="id"
    :data-identity="id"
    @click="onClick"
    :aria-label="ariaLabel"
    :class="classes"
    class="bg-transparent hover:bg-zinc-200 hover:text-zinc-800 transition-all duration-500 p-2 rounded-lg"
  >
    <slot />
  </button>
</template>
