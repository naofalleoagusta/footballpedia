<script setup lang="ts">
import { toRefs, ref } from "vue";
import VirtualList from "@virtual-list/vue";

import DataItem from "./components/DataItem.vue";

import type { DataType } from "./types";
import { NO_CREST_IMG } from "@/config";

const scroller = ref<HTMLDivElement | null>(null);

const props = defineProps<{
  datas: DataType[] | null;
  isError: boolean;
  title: string;
  route: "area/" | "team/";
  scrollThreshold?: string;
}>();

const { datas, isError, title, route } = toRefs(props);
const isScrolled = ref(false);

const handleOnScroll = (event: Event) => {
  const elTitle = document.getElementById("page-title");
  if (elTitle) {
    const target = <HTMLDivElement>event.target;
    elTitle.style.maxHeight =
      target.scrollTop > 100 ? props.scrollThreshold || "0" : "250px";
    isScrolled.value = target.scrollTop > 100;
  }
};
</script>

<template>
  <div v-if="isError">Something is wrong..</div>
  <div v-if="!datas && !isError">loading..</div>
  <div v-if="!!datas?.length">
    <h2 class="text-3xl underline mb-[30px]">{{ title }}</h2>
    <VirtualList
      :items="datas"
      class="w-full scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md scrollbar-track-zinc-600 scrollbar-track-rounded-md"
      :class="isScrolled ? 'h-[50vh] md:h-[55vh]' : 'h-[40vh] md:h-[50vh]'"
      ref="scroller"
      @scroll="handleOnScroll"
    >
      <template #default="{ item }">
        <DataItem :data="item" :route="route">
          <img :src="item.icon || NO_CREST_IMG" class="w-[20px] h-[20px]" />
        </DataItem>
      </template>
    </VirtualList>
  </div>
</template>
