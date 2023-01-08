<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

import TitleHeader from "@/components/ui_palette/TitleHeader.vue";
import Skeleton from "@/components/ui_palette/Skeleton.vue";
import PageNotFound from "@/components/ui_palette/PageNotFound.vue";
import Breadcrumb from "@/components/ui_palette/Breadcrumb.vue";

import useFetchFootball from "@/hooks/useFetchFootball";
import useTitle from "@/hooks/useTitle";

import type { GetAreaDetailType } from "@/types/area";
import type { BreadcrumbType } from "@/types";
import { INITIAL_VALUE_BREADCRUMBS } from "@/constant/breadcrumb";

const area = ref<Pick<GetAreaDetailType, "name" | "parentArea"> | null>(null);
const isError = ref(false);
const route = useRoute();
const breadcrumbs = ref<BreadcrumbType[]>(INITIAL_VALUE_BREADCRUMBS);
const title = useTitle();

onBeforeMount(async () => {
  const { data, error } = await useFetchFootball<GetAreaDetailType>({
    route: `areas/${route.params.id}`,
  });
  area.value = data.value
    ? { name: data.value?.name, parentArea: data.value?.parentArea }
    : null;
  isError.value = !!error.value;
  title.value = `${data.value?.name || "Area"} | Footballpedia`;
});
</script>

<template>
  <PageNotFound v-if="isError" text="Area" />
  <div v-if="!area && !isError" class="flex flex-col gap-2 mb-[10vh]">
    <Skeleton width="50%" />
    <Skeleton width="100px" />
  </div>
  <div v-if="area">
    <Breadcrumb :breadcrumbs="breadcrumbs" />
    <TitleHeader :title="area.name" :subtitle="`${area.parentArea}`" />
  </div>
</template>
