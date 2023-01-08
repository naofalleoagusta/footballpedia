<script setup lang="ts">
import { toRefs } from "vue";
import type { DataType } from "../types";

const props = defineProps<{
  data: DataType;
  route: "area/" | "team/";
}>();

const { data, route } = toRefs(props);
</script>

<template>
  <h2
    v-if="!data.id"
    class="text-4xl w-fit pb-2 my-4 border-b-2 border-zinc-200"
  >
    {{ data.name }}
  </h2>
  <div v-else class="">
    <RouterLink
      :to="`/${route}${data.id}`"
      class="break-all text-zinc-400 hover:text-zinc-200 duration-300 transition-colors flex-grow py-3 flex items-center gap-4"
    >
      <slot />
      <span>
        {{ data.name }}
      </span>
    </RouterLink>
  </div>
</template>
