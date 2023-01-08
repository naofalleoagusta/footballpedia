<script setup lang="ts">
import { toRef } from "vue";
import VirtualList from "@virtual-list/vue";

import PlayerCardVue from "./PlayerCard.vue";

import type { SquadType } from "@/types/team";

const props = defineProps<{
  data: SquadType[];
}>();

const squad = toRef(props, "data");

</script>
<template>
  <VirtualList
    :items="squad"
    class="w-full scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md scrollbar-track-zinc-600 scrollbar-track-rounded-md h-[40vh] md:h-[50vh] pr-2"
  >
    <template #default="{ item }">
      <PlayerCardVue :player="item" />
    </template>
  </VirtualList>
</template>
