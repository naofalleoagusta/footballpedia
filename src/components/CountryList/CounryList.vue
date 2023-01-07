<script setup lang="ts">
import { computed, toRef } from "vue";

import CountryItem from "./components/CountryItem.vue";

import convertToGroupedAreas from "./helpers/convertToGroupedArea";

import type { AreaType } from "@/types/area";

const props = defineProps<{
  areaList: AreaType[];
}>();

const areaList = toRef(props, "areaList");

const groupedAreas = computed(() => convertToGroupedAreas(areaList.value));
</script>

<template>
  <div class="mt-[20vh]">
    <h2 class="text-5xl underline mb-[50px]">Country List :</h2>
    <CountryItem v-for="groupedArea in groupedAreas" :grouped-area="groupedArea" />
  </div>
</template>
