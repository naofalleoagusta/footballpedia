<script setup lang="ts">
import { toRef } from "vue";
import type { GroupedAreaType } from "../helpers/convertToGroupedArea";

const props = defineProps<{
  groupedArea: GroupedAreaType;
}>();

const groupedArea = toRef(props, "groupedArea");
</script>

<template>
  <div
    class="flex items-start w-full mb-[50px] gap-4 border-b-2 border-zinc-50 last:border-b-0 pb-[50px]"
    :id="`grouped-area-${groupedArea.key}`"
  >
    <h2 class="flex-shrink-0 text-4xl w-[40px]">
      {{ groupedArea.key }}
    </h2>
    <div class="flex-grow grid grid-cols-2 md:grid-cols-3 gap-4">
      <RouterLink
        v-for="area in groupedArea.areas"
        :to="`/area/${area.id}`"
        class="break-all"
      >
        {{ area.name }}
      </RouterLink>
    </div>
  </div>
</template>
