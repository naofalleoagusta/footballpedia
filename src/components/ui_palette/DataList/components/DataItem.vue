<script setup lang="ts">
import { toRefs } from "vue";
import type { DataType } from "../types";

const props = defineProps<{
  data: DataType;
}>();

const { data } = toRefs(props);
</script>

<template>
  <h2 v-if="!data.id" class="text-4xl w-fit pb-2 my-4 border-b-2 border-zinc-200">
    {{ data.name }}
  </h2>
  <div v-else class="py-3 group flex">
    <RouterLink :to="`/area/${data.id}`" class="break-all text-zinc-400 group-hover:text-zinc-200 duration-300 transition-colors flex-grow">
      {{ data.name }}
    </RouterLink>
  </div>
</template>
