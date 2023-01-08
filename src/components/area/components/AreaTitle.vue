<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

import TitleHeader from "@/components/ui_palette/TitleHeader.vue";

import useFetchFootball from "@/hooks/useFetchFootball";

import type { GetAreaDetailType } from "@/types/area";
import Skeleton from "@/components/ui_palette/Skeleton.vue";
import PageNotFound from "@/components/ui_palette/PageNotFound.vue";

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
  <PageNotFound v-if="isError" text="Area" />
  <div v-if="!area && !isError" class="flex flex-col gap-2 mb-[10vh]">
    <Skeleton width="50%" />
    <Skeleton width="100px" />
  </div>
  <div v-if="area">
    <TitleHeader :title="area.name" :subtitle="`${area.parentArea}`" />
  </div>
</template>
