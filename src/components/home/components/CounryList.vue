<script setup lang="ts">
import { computed, ref, onBeforeMount } from "vue";

import convertToGroupedAreas from "../helpers/convertToGroupedArea";
import useFetchFootball from "@hooks/useFetchFootball";

import type { AreaType, GetAreaReturnType } from "@/types/area";
import DataList from "@/components/ui_palette/DataList/DataList.vue";

const areaList = ref<AreaType[] | null>(null);
const isError = ref(false);

onBeforeMount(async () => {
  const { data, error } = await useFetchFootball<GetAreaReturnType>({
    route: "areas/",
  });
  areaList.value = data.value?.areas ?? null;
  isError.value = !!error.value;
});

const groupedAreas = computed(() => convertToGroupedAreas(areaList.value));
</script>

<template>
  <DataList :datas="groupedAreas" :is-error="isError" :title="'Country List'" />
</template>
