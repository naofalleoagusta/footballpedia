<script setup lang="ts">
import { toRefs, ref, computed, nextTick } from "vue";
import VirtualList from "@virtual-list/vue";

import DataItem from "./components/DataItem.vue";
import PlaceHolder from "./components/PlaceHolder.vue";
import Button from "../Button.vue";

import type { DataType } from "./types";
import { NO_CREST_IMG } from "@/config";

const props = defineProps<{
  datas: DataType[] | null;
  isError: boolean;
  title: string;
  route: "area/" | "team/";
  scrollThreshold?: string;
}>();

const { datas, isError, title, route } = toRefs(props);
const isScrolled = ref(false);
const showSearchBar = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const query = ref("");

const handleOnScroll = (event: Event) => {
  const elTitle = document.getElementById("page-title");
  if (elTitle) {
    const target = <HTMLDivElement>event.target;
    elTitle.style.maxHeight =
      target.scrollTop > 100 ? props.scrollThreshold || "0" : "250px";
    isScrolled.value = target.scrollTop > 100;
  }
};

const toggleSearchBar = () => {
  showSearchBar.value = !showSearchBar.value;
  query.value = "";
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus();
    }
  });
};

const handleOnChangeInput = (e: Event) => {
  query.value = (e.target as HTMLInputElement).value;
};

const filteredDatas = computed(() =>
  !!query.value
    ? datas.value?.filter((data) =>
        data.name.toLowerCase().includes(query.value.toLowerCase())
      )
    : datas.value
);
</script>

<template>
  <div v-if="isError" class="text-xl">
    Something is wrong...most likely CORS anywhere is expired/too many request.
    Please contact me through
    <a class="underline" href="mailto:naofal.leo.agusta98@gmail.com">my email</a
    >.
  </div>
  <PlaceHolder v-if="!datas && !isError" />
  <div v-if="!!filteredDatas">
    <div v-if="!showSearchBar" class="flex mb-[30px] items-center">
      <h2 class="text-2xl sm:text-3xl underline flex-grow">{{ title }}</h2>
      <Button id="toggle-search-btn" v-on:click="toggleSearchBar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 md:w-8 md:h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </Button>
    </div>
    <div
      v-else
      class="flex mb-[30px] items-center border-b-2 border-zinc-200 pb-2"
    >
      <input
        id="search-input-field"
        class="outline-none border-none flex-grow bg-zinc-900 text-xl"
        ref="inputRef"
        type="text"
        :value="query"
        @input="handleOnChangeInput"
      />
      <Button
        id="toggle-search-btn"
        class="flex-shrink-0"
        v-on:click="toggleSearchBar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 md:w-8 md:h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Button>
    </div>
    <VirtualList
      v-if="!!filteredDatas.length"
      :items="filteredDatas"
      class="w-full scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md scrollbar-track-zinc-600 scrollbar-track-rounded-md"
      :class="isScrolled ? 'h-[55vh] md:h-[60vh]' : 'h-[50vh] md:h-[55vh]'"
      @scroll="handleOnScroll"
    >
      <template #default="{ item }">
        <DataItem :data="item" :route="route">
          <img v-lazy="item.icon || NO_CREST_IMG" class="w-[20px] h-[20px]" />
        </DataItem>
      </template>
    </VirtualList>
    <div v-else>No entries matched, try another keyword.</div>
  </div>
</template>
