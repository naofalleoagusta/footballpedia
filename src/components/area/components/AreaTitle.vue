<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

import TitleHeader from "@/components/ui_palette/TitleHeader.vue";

import useFetchFootball from "@/hooks/useFetchFootball";

import type { GetAreaDetailType } from "@/types/area";

const area = ref<Pick<GetAreaDetailType, "name" | "parentArea"> | null>(null);
const isError = ref(false);
const route = useRoute();

onBeforeMount(async () => {
  const { data, error } = await useFetchFootball<GetAreaDetailType>({
    route: `areas/${route.params.id}`,
  });
  area.value = data.value
    ? { name: data.value?.name, parentArea: data.value?.parentArea }
    : null;
  isError.value = !!error.value;
});
</script>

<template>
  <div v-if="isError">
    <h1>Country not found.</h1>
    <span>Go back, <RouterLink to="/">Home</RouterLink> ?</span>
  </div>
  <div v-if="!area">loading..</div>
  <div v-if="area">
    <TitleHeader
      :title="area.name"
      :subtitle="`${area.parentArea}`"
    />
  </div>
</template>
