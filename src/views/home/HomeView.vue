<script setup lang="ts">
import { ref, onBeforeMount } from "vue";

import type { AreaType, GetAreaReturnType } from "@/types/area";

import AreaList from "@/components/CountryList/CounryList.vue";

import useFetchFootball from "@/hooks/useFetchFootball";

const areaList = ref<AreaType[] | undefined>();
const isError = ref(false);

onBeforeMount(async () => {
  const { data, error } = await useFetchFootball<GetAreaReturnType>({
    route: "/areas/",
  });
  areaList.value = data.value?.areas;
  isError.value = !!error.value;
});
</script>

<template>
  <main class="mt-[20vh]">
    <h1 class="text-5xl">Welcome to FootballPedia.</h1>
    <p class="text-lg mt-2">
      Access all information about football around the world.
    </p>
    <div v-if="isError">Something is wrong..</div>
    <div v-if="!areaList">loading..</div>
    <AreaList v-else="areaList" :area-list="areaList" />
  </main>
</template>
