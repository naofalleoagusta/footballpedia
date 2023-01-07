<script setup lang="ts">
import { toRefs, ref, watch } from "vue";
import VirtualList from "@virtual-list/vue";

import DataItem from "./components/DataItem.vue";

import type { DataType } from "./types";

const scroller = ref<HTMLDivElement | null>(null);

const props = defineProps<{
  datas: DataType[] | null;
  isError: boolean;
  title: string;
}>();

const { datas, isError, title } = toRefs(props);
</script>

<template>
  <h2 class="text-5xl underline mb-[50px]">{{ title }} :</h2>
  <div v-if="isError">Something is wrong..</div>
  <div v-if="!datas && !isError">loading..</div>
  <VirtualList
    v-if="datas"
    :items="datas"
    class="w-full h-[50vh] scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md scrollbar-track-zinc-600 scrollbar-track-rounded-md"
    ref="scroller"
  >
    <template #default="{ item, index }">
      <DataItem :data="item" />
    </template>
  </VirtualList>
</template>
